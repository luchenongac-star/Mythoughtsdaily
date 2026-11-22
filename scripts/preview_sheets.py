import cv2, json, os, glob, sys, numpy as np
RAW = os.path.join(os.path.dirname(__file__), "..", "raw")
PREV = sys.argv[1]
auto = json.load(open(os.path.join(PREV, "auto.json")))
manual = json.load(open(sys.argv[2])) if len(sys.argv) > 2 and os.path.exists(sys.argv[2]) else None
def render(name, S=1000):
    img = cv2.imread(os.path.join(RAW, name)); H, W = img.shape[:2]
    s = S / max(W, H); vis = cv2.resize(img, None, fx=s, fy=s)
    for gx in range(0, W, 100):
        x = int(gx*s); cv2.line(vis, (x,0), (x,vis.shape[0]), (255,255,255), 1)
        cv2.putText(vis, str(gx), (x+2, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (0,0,0), 2); cv2.putText(vis, str(gx), (x+2, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (255,255,255), 1)
    for gy in range(0, H, 100):
        y = int(gy*s); cv2.line(vis, (0,y), (vis.shape[1],y), (255,255,255), 1)
        cv2.putText(vis, str(gy), (2, y-2), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (0,0,0), 2); cv2.putText(vis, str(gy), (2, y-2), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (255,255,255), 1)
    boxes = manual.get(name, []) if manual else auto[name]
    for i, b in enumerate(boxes):
        x, y, w, h = [int(v*s) for v in b[:4]]
        cv2.rectangle(vis, (x,y), (x+w,y+h), (0,0,255) if manual is None else (0,200,0), 2)
        if manual is None: cv2.putText(vis, str(i), (x, y+14), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)
    cv2.putText(vis, name, (20, vis.shape[0]-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,255), 2)
    return vis
names = sorted(auto)
sel = [n for n in names if int(n[:2]) in set(map(int, sys.argv[3].split(',')))] if len(sys.argv) > 3 else names
H = 1000
tiles = []
for n in sel:
    v = render(n); 
    if v.shape[0] < H: v = cv2.copyMakeBorder(v, 0, H-v.shape[0], 0, 0, cv2.BORDER_CONSTANT)
    tiles.append(v)
sheet = np.hstack(tiles)
tag = sys.argv[3].replace(',', '_') if len(sys.argv) > 3 else 'all'
cv2.imwrite(os.path.join(PREV, f"sheet_{tag}.jpg"), sheet, [cv2.IMWRITE_JPEG_QUALITY, 85])
print(sheet.shape)
