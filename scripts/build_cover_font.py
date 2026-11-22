"""Copy only the ZCOOL KuaiLe slices needed by the cover text (keeps the repo small)."""
import re, json, shutil, os
SRC = "node_modules/@fontsource/zcool-kuaile/"
OUT = "public/fonts/zcool/"
TEXT = ("吉隆坡被皮卡丘淹没了！宝可梦周年路跑｜集齐只道馆徽章到手跑完真的拿到奖牌限定卡玩偶一起来"
        "KLCC30,.·:!?0123456789 ")
css = open(SRC + "index.css", encoding="utf-8").read()
need = {ord(c) for c in TEXT}
out = []
for blk in re.findall(r"@font-face\s*\{.*?\}", css, flags=re.S):
    f = re.search(r"url\(\./files/([^)]+\.woff2)\)", blk).group(1)
    rng = re.search(r"unicode-range:\s*([^;]+);", blk).group(1).strip()
    ok = False
    for part in rng.split(","):
        part = part.strip().lstrip("Uu+")
        a, _, b = part.partition("-")
        lo = int(a, 16); hi = int(b, 16) if b else lo
        if any(lo <= c <= hi for c in need): ok = True; break
    if ok:
        shutil.copy(SRC + "files/" + f, OUT + f); out.append({"file": f, "range": rng})
json.dump(out, open("src/covers/zcoolSlices.json", "w"), ensure_ascii=False, indent=1)
missing = [c for c in TEXT if not any(any(
    (lambda a,b: a <= ord(c) <= b)(int(p.strip().lstrip('Uu+').partition('-')[0],16), int((p.strip().lstrip('Uu+').partition('-')[2] or p.strip().lstrip('Uu+').partition('-')[0]),16))
    for p in s["range"].split(",")) for s in out)]
print(len(out), "slices;", "uncovered chars:", "".join(missing))
