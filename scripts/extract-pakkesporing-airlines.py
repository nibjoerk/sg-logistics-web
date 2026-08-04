"""Extract airline prefixes from pakkesporing.no flyfrakt HTML and compare to ours."""
import csv
import re
from html import unescape
from pathlib import Path

html = Path(r"C:\Users\nils.erik.bjorkedal\AppData\Local\Temp\pk-fly.html").read_text(encoding="utf-8", errors="replace")
tracking = Path(r"C:\Projects\NewWEB\src\data\tracking.ts").read_text(encoding="utf-8")
iata_path = Path(r"C:\Users\nils.erik.bjorkedal\AppData\Local\Temp\iata-all.csv")

# span title="390"><a ...>Aegean Airlines(A3)</a>
pat = re.compile(
    r'<span title="(\d{0,3})"><a[^>]*href="([^"]*)"[^>]*>([^<]+)</a></span>',
    re.I,
)
entries = []
for m in pat.finditer(html):
    prefix, href, label = m.group(1), m.group(2), unescape(m.group(3).strip())
    # strip (XX) designator
    name = re.sub(r"\s*\([^)]*\)\s*$", "", label).strip()
    entries.append({"prefix": prefix.zfill(3) if prefix.isdigit() else "", "name": name, "label": label, "href": href})

# Also catch spans without useful prefix
print(f"Parsed {len(entries)} airline links from pakkesporing")

ours = {p: n for p, n in re.findall(r'prefix:\s*"(\d{3})",\s*name:\s*"([^"]+)"', tracking)}

iata = {}
if iata_path.exists():
    with iata_path.open(encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            p = (row.get("Prefix") or "").strip()
            if p:
                iata[p] = (row.get("Name") or "").replace("&#x27;", "'").replace("&#xE9;", "é").replace("&#xFC;", "ü")

missing = []
have = []
no_prefix = []
for e in entries:
    if not e["prefix"]:
        no_prefix.append(e)
        continue
    if e["prefix"] in ours:
        have.append(e)
    else:
        missing.append(e)

print(f"Already in ours: {len(have)}")
print(f"Missing with prefix: {len(missing)}")
print(f"No prefix on pakkesporing: {len(no_prefix)}")
print()
print("=== MISSING (prefix, pakkesporing name, IATA name if any) ===")
for e in sorted(missing, key=lambda x: x["prefix"]):
    iata_name = iata.get(e["prefix"], "")
    mark = "" if not iata_name or iata_name.lower() in e["name"].lower() or e["name"].lower() in iata_name.lower() else "  !IATA_DIFF"
    print(f"{e['prefix']}  {e['name'][:40]:40}  IATA={iata_name[:40] or '-'}{mark}")

out = Path(r"C:\Projects\NewWEB\scripts\pakkesporing-missing.json")
import json
out.write_text(json.dumps({"missing": missing, "have": [{"prefix": e["prefix"], "name": e["name"]} for e in have], "no_prefix": no_prefix}, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\nWrote {out}")
