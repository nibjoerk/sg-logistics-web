import csv
import re
from pathlib import Path

iata_path = Path(r"C:\Users\nils.erik.bjorkedal\AppData\Local\Temp\iata-all.csv")
tracking_path = Path(r"C:\Projects\NewWEB\src\data\tracking.ts")

iata = {}
with iata_path.open(encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        prefix = (row.get("Prefix") or "").strip()
        if not prefix:
            continue
        name = (row.get("Name") or "").replace("&#x27;", "'").replace("&#xFC;", "ü").strip()
        # Prefer first non-empty; warn on duplicates
        if prefix in iata and iata[prefix] != name:
            print(f"DUP {prefix}: {iata[prefix]!r} vs {name!r}")
        else:
            iata[prefix] = name

text = tracking_path.read_text(encoding="utf-8")
ours = re.findall(r'prefix:\s*"(\d{3})",\s*name:\s*"([^"]+)"', text)

print(f"Ours: {len(ours)}  IATA with prefix: {len(iata)}")
print()

match = []
diff = []
missing = []
for prefix, name in ours:
    if prefix not in iata:
        missing.append((prefix, name))
    elif iata[prefix] == name:
        match.append((prefix, name))
    else:
        diff.append((prefix, name, iata[prefix]))

print("=== EXACT MATCH ===")
for p, n in match:
    print(f"  {p}  {n}")

print()
print("=== NAME DIFF (ours -> IATA) ===")
for p, ours_n, iata_n in diff:
    print(f"  {p}  {ours_n!r}  ->  {iata_n!r}")

print()
print("=== NOT ON IATA MEMBER LIST (keep operational name) ===")
for p, n in missing:
    print(f"  {p}  {n}")

print()
print(f"Summary: {len(match)} match, {len(diff)} differ, {len(missing)} not on list")
