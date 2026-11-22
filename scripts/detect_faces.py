"""Detect candidate faces with Haar cascades; dump JSON + annotated previews for manual review."""
import cv2, json, os, glob, sys
D = os.path.join(os.path.dirname(cv2.__file__), "data")
CASC = [cv2.CascadeClassifier(os.path.join(D, n)) for n in
        ("haarcascade_frontalface_default.xml", "haarcascade_frontalface_alt2.xml", "haarcascade_profileface.xml")]
RAW = os.path.join(os.path.dirname(__file__), "..", "raw")
PREV = sys.argv[1]
os.makedirs(PREV, exist_ok=True)

def iou(a, b):
    ax, ay, aw, ah = a; bx, by, bw, bh = b
    x1, y1 = max(ax, bx), max(ay, by); x2, y2 = min(ax+aw, bx+bw), min(ay+ah, by+bh)
    i = max(0, x2-x1) * max(0, y2-y1)
    return i / (aw*ah + bw*bh - i + 1e-9)

out = {}
for p in sorted(glob.glob(os.path.join(RAW, "*.jpg"))):
    name = os.path.basename(p)
    img = cv2.imread(p); H, W = img.shape[:2]
    g = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))
    boxes = []
    mn = max(18, int(min(W, H) * 0.012))
    for k, c in enumerate(CASC):
        for flip in ([False, True] if k == 2 else [False]):
            gg = cv2.flip(g, 1) if flip else g
            for b in c.detectMultiScale(gg, 1.08, 4, minSize=(mn, mn)):
                x, y, w, h = [int(v) for v in b]
                if flip: x = W - x - w
                boxes.append((x, y, w, h))
    keep = []
    for b in sorted(boxes, key=lambda b: -b[2]*b[3]):
        if all(iou(b, k) < 0.3 for k in keep): keep.append(b)
    out[name] = keep
    vis = img.copy()
    for i, (x, y, w, h) in enumerate(keep):
        cv2.rectangle(vis, (x, y), (x+w, y+h), (0, 0, 255), max(2, W//300))
        cv2.putText(vis, str(i), (x, max(20, y-6)), cv2.FONT_HERSHEY_SIMPLEX, max(0.8, W/1200), (0, 0, 255), 2)
    s = 900 / max(W, H)
    cv2.imwrite(os.path.join(PREV, name), cv2.resize(vis, None, fx=s, fy=s))
    print(name, len(keep), keep)
json.dump(out, open(os.path.join(PREV, "auto.json"), "w"))
