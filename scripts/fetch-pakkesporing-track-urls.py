"""Fetch pakkesporing track_form templates for missing airline prefixes and generate TS entries."""
from __future__ import annotations

import csv
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path(r"C:\Projects\NewWEB")
MISSING_JSON = ROOT / "scripts" / "pakkesporing-missing.json"
IATA_CSV = Path(r"C:\Users\nils.erik.bjorkedal\AppData\Local\Temp\iata-all.csv")
OUT_JSON = ROOT / "scripts" / "pakkesporing-track-templates.json"
OUT_TS_SNIPPET = ROOT / "scripts" / "pakkesporing-new-airlines.ts.txt"

SAMPLE_SERIAL = "12345675"
UA = "Mozilla/5.0 (compatible; SGLogisticsBot/1.0; +https://sglogistics.no)"


def track_form(prefix: str) -> str:
    number = f"{prefix}{SAMPLE_SERIAL}"
    data = urllib.parse.urlencode({"number": number, "config": "206600"}).encode()
    req = urllib.request.Request(
        "https://www.pakkesporing.no/flyfrakt/track_form",
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": UA,
            "Referer": "https://www.pakkesporing.no/flyfrakt",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def parse_response(html: str) -> dict:
    mtype = re.search(r'id="direct-type"[^>]*>(?:<span>)?([^<]+)', html)
    dtype = (mtype.group(1).strip() if mtype else "unknown").lower()
    if dtype == "problem":
        return {"type": "problem"}
    if dtype == "url":
        m = re.search(r'id="direct-form"[^>]*>([^<]+)', html)
        return {"type": "url", "url": unescape(m.group(1).strip()) if m else None}
    if dtype == "form":
        action = re.search(r'<form[^>]*action="([^"]+)"[^>]*method="([^"]+)"', html, re.I)
        fields = re.findall(r'<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"', html, re.I)
        # also value before name
        fields2 = re.findall(r'<input[^>]*value="([^"]*)"[^>]*name="([^"]+)"', html, re.I)
        field_map = {n: v for n, v in fields}
        for v, n in fields2:
            field_map.setdefault(n, v)
        return {
            "type": "form",
            "method": (action.group(2).lower() if action else "get"),
            "action": unescape(action.group(1)) if action else None,
            "fields": field_map,
        }
    return {"type": dtype, "raw": html[:500]}


def load_iata() -> dict[str, str]:
    iata = {}
    with IATA_CSV.open(encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            p = (row.get("Prefix") or "").strip()
            if not p:
                continue
            name = row.get("Name") or ""
            name = (
                name.replace("&#x27;", "'")
                .replace("&#xE9;", "é")
                .replace("&#xFC;", "ü")
                .replace("&#xF4;", "ô")
                .replace("&#xC9;", "É")
            )
            iata[p] = name
    return iata


def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def template_expr(value: str, prefix: str) -> str | None:
    """Return a JS expression string for a field value, or None if static."""
    full = prefix + SAMPLE_SERIAL
    dashed = f"{prefix}-{SAMPLE_SERIAL}"
    if value == full:
        return "awb"
    if value == dashed:
        return "`${awb.slice(0, 3)}-${awb.slice(3)}`"
    if value == prefix:
        return "awb.slice(0, 3)"
    if value == SAMPLE_SERIAL:
        return "awb.slice(3)"
    if full in value:
        # embed in larger string
        parts = value.split(full)
        if len(parts) == 2:
            return f"`{parts[0]}${{awb}}{parts[1]}`"
    if dashed in value:
        parts = value.split(dashed)
        if len(parts) == 2:
            return f"`{parts[0]}${{awb.slice(0, 3)}}-${{awb.slice(3)}}{parts[1]}`"
    if SAMPLE_SERIAL in value and prefix in value:
        # generic replace both
        out = value.replace(full, "${awb}").replace(dashed, "${awb.slice(0, 3)}-${awb.slice(3)}")
        out = out.replace(SAMPLE_SERIAL, "${awb.slice(3)}").replace(prefix, "${awb.slice(0, 3)}")
        return f"`{out}`"
    return None  # static


def build_entry(prefix: str, name: str, parsed: dict) -> str:
    """Generate one AirlineTracker object literal as TS source."""
    if parsed.get("type") == "url" and parsed.get("url"):
        url = parsed["url"]
        expr = template_expr(url, prefix)
        if expr and expr.startswith("`"):
            return f'  {{ prefix: "{prefix}", name: {ts_string(name)}, buildUrl: (awb) => {expr} }},'
        if expr == "awb":
            # shouldn't happen for full URL
            pass
        # try replace manually
        full = prefix + SAMPLE_SERIAL
        dashed = f"{prefix}-{SAMPLE_SERIAL}"
        templ = url.replace(full, "${awb}").replace(dashed, "${awb.slice(0, 3)}-${awb.slice(3)}")
        templ = templ.replace(SAMPLE_SERIAL, "${awb.slice(3)}").replace(f"/{prefix}/", "/${awb.slice(0, 3)}/")
        if "${" in templ:
            return f'  {{ prefix: "{prefix}", name: {ts_string(name)}, buildUrl: (awb) => `{templ}` }},'
        return f'  {{ prefix: "{prefix}", name: {ts_string(name)}, buildUrl: () => {ts_string(url)}, manualEntry: true }},'

    if parsed.get("type") == "form" and parsed.get("action"):
        method = parsed.get("method", "get")
        action = parsed["action"]
        fields = parsed.get("fields") or {}
        if method == "get":
            # Build query URL
            q_parts = []
            for k, v in fields.items():
                if k in ("commit",):
                    continue
                expr = template_expr(v, prefix)
                if expr is None:
                    q_parts.append(f"{urllib.parse.quote(k)}={urllib.parse.quote(v)}")
                elif expr == "awb":
                    q_parts.append(f"{urllib.parse.quote(k)}=${{awb}}")
                elif expr == "awb.slice(0, 3)":
                    q_parts.append(f"{urllib.parse.quote(k)}=${{awb.slice(0, 3)}}")
                elif expr == "awb.slice(3)":
                    q_parts.append(f"{urllib.parse.quote(k)}=${{awb.slice(3)}}")
                elif expr.startswith("`"):
                    inner = expr[1:-1]
                    q_parts.append(f"{urllib.parse.quote(k)}={inner}")
                else:
                    q_parts.append(f"{urllib.parse.quote(k)}=${{{expr}}}")
            qs = "&".join(q_parts)
            sep = "&" if "?" in action else "?"
            return f'  {{ prefix: "{prefix}", name: {ts_string(name)}, buildUrl: (awb) => `{action}{sep}{qs}` }},'
        # POST
        post_fields = []
        for k, v in fields.items():
            expr = template_expr(v, prefix)
            if expr is None:
                post_fields.append(f"{ts_string(k)}: {ts_string(v)}")
            elif expr in ("awb", "awb.slice(0, 3)", "awb.slice(3)"):
                post_fields.append(f"{ts_string(k)}: {expr}")
            elif expr.startswith("`"):
                post_fields.append(f"{ts_string(k)}: {expr}")
            else:
                post_fields.append(f"{ts_string(k)}: {expr}")
        body = ", ".join(post_fields)
        return (
            f'  {{ prefix: "{prefix}", name: {ts_string(name)}, buildUrl: () => {ts_string(action)}, '
            f"buildManualPostFields: (awb) => ({{ {body} }}) }},"
        )

    return f'  {{ prefix: "{prefix}", name: {ts_string(name)}, buildUrl: null }},'


def main() -> None:
    missing = json.loads(MISSING_JSON.read_text(encoding="utf-8"))["missing"]
    iata = load_iata()
    results = []
    lines = []
    for i, e in enumerate(sorted(missing, key=lambda x: x["prefix"])):
        prefix = e["prefix"]
        if not prefix or not prefix.isdigit():
            continue
        # Prefer IATA official name
        name = iata.get(prefix) or e["name"]
        # Keep UTF-8 fixes for known entities already decoded in iata loader
        try:
            html = track_form(prefix)
            parsed = parse_response(html)
        except Exception as ex:  # noqa: BLE001
            parsed = {"type": "error", "error": str(ex)}
            html = ""
        entry = build_entry(prefix, name, parsed)
        lines.append(entry)
        results.append({"prefix": prefix, "name": name, "pk_name": e["name"], "parsed": parsed, "entry": entry})
        print(f"[{i+1}/{len(missing)}] {prefix} {name}: {parsed.get('type')}")
        time.sleep(0.25)

    OUT_JSON.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    OUT_TS_SNIPPET.write_text("\n".join(lines) + "\n", encoding="utf-8")
    with_url = sum(1 for r in results if "buildUrl: null" not in r["entry"])
    print(f"Done. {with_url}/{len(results)} have tracking; wrote {OUT_TS_SNIPPET}")


if __name__ == "__main__":
    main()
