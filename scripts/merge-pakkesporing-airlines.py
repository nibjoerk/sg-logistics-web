"""Merge pakkesporing-new airlines into tracking.ts without overwriting existing prefixes."""
from __future__ import annotations

import re
from pathlib import Path

TRACKING = Path(r"C:\Projects\NewWEB\src\data\tracking.ts")
NEW = Path(r"C:\Projects\NewWEB\scripts\pakkesporing-new-airlines.ts.txt")

SKIP_PREFIXES = {"612"}  # IATA uses 617 TUIfly

text = TRACKING.read_text(encoding="utf-8")

marker = "export const airlinePrefixes: AirlineTracker[] = ["
start = text.index(marker)
# Find matching closing ]; for the array by brace depth starting after '['
i = start + len(marker) - 1  # points at '['
depth = 0
end = None
for j in range(i, len(text)):
    ch = text[j]
    if ch == "[":
        depth += 1
    elif ch == "]":
        depth -= 1
        if depth == 0:
            # expect ];
            end = j + 1
            if end < len(text) and text[end] == ";":
                end += 1
            break
if end is None:
    raise SystemExit("Could not find end of airlinePrefixes array")

array_body = text[start:end]

existing_by_prefix: dict[str, str] = {}
for line in array_body.splitlines():
    stripped = line.strip().rstrip(",")
    if not stripped.startswith("{ prefix:"):
        continue
    m = re.search(r'prefix:\s*"(\d{3})"', stripped)
    if m:
        existing_by_prefix[m.group(1)] = stripped

added = 0
for line in NEW.read_text(encoding="utf-8").splitlines():
    line = line.strip().rstrip(",")
    if not line.startswith("{ prefix:"):
        continue
    m = re.search(r'prefix:\s*"(\d{3})"', line)
    if not m:
        continue
    prefix = m.group(1)
    if prefix in SKIP_PREFIXES or prefix in existing_by_prefix:
        continue
    if prefix == "203" and "buildManualPostFields" in line and "__VIEWSTATE" not in line:
        line = line.replace(
            'buildManualPostFields: (awb) => ({ "txtPrefix"',
            'buildManualPostFields: (awb) => ({ __EVENTTARGET: "", __EVENTARGUMENT: "", __VIEWSTATE: "", "txtPrefix"',
        )
    existing_by_prefix[prefix] = line
    added += 1

new_array_lines = ["export const airlinePrefixes: AirlineTracker[] = ["]
for p in sorted(existing_by_prefix.keys()):
    new_array_lines.append(f"  {existing_by_prefix[p]},")
new_array_lines.append("];")
new_array = "\n".join(new_array_lines)

# Rebuild full file: keep everything before marker, then new array, then after old array
# Also update the doc comment immediately above if present.
before = text[:start]
after = text[end:]

# Fix/replace trailing doc comment in `before`
comment_pat = re.compile(r"/\*\*\n \* Airline AWB prefixes[\s\S]*?\*/\n\n$", re.M)
new_comment = """/**
 * Airline AWB prefixes: SG history + carriers supported via pakkesporing.no tracking templates.
 * Names aligned with IATA Current Airline Members (3-digit code) where available.
 * buildUrl with AWB in the URL = deep-link (GET).
 * buildUrl + buildManualPostFields = open portal via POST with AWB prefilled.
 * buildUrl + manualEntry = opens portal; user pastes AWB (copied to clipboard).
 * buildUrl null = airline identified only; user is asked to contact us.
 */

"""
before2, n = comment_pat.subn(new_comment, before, count=1)
if n != 1:
    print("Warning: doc comment not replaced", n)

TRACKING.write_text(before2 + new_array + after, encoding="utf-8")
print(f"Added {added}. Total {len(existing_by_prefix)}. File OK markers preserved.")
