"""Blur bystander faces (feathered elliptical gaussian) and write public/photos/*.jpg."""
import cv2, json, os, glob, numpy as np
HERE = os.path.dirname(__file__)
RAW, OUT = os.path.join(HERE, "..", "raw"), os.path.join(HERE, "..", "public", "photos")
boxes = json.load(open(os.path.join(HERE, "blur_boxes.json")))
os.makedirs(OUT, exist_ok=True)
for p in sorted(glob.glob(os.path.join(RAW, "*.jpg"))):
    n = os.path.basename(p); img = cv2.imread(p); H, W = img.shape[:2]
    for x, y, w, h in boxes.get(n, []):
        pad = int(max(w, h) * 0.2)
        x0, y0, x1, y1 = max(0, x-pad), max(0, y-pad), min(W, x+w+pad), min(H, y+h+pad)
        roi = img[y0:y1, x0:x1]
        k = max(15, (max(w, h) // 2) | 1)
        small = cv2.resize(roi, (max(2, roi.shape[1]//12), max(2, roi.shape[0]//12)), interpolation=cv2.INTER_AREA)
        pix = cv2.resize(small, (roi.shape[1], roi.shape[0]), interpolation=cv2.INTER_NEAREST)
        blur = cv2.GaussianBlur(pix, (k, k), 0)
        m = np.zeros(roi.shape[:2], np.float32)
        cv2.ellipse(m, (roi.shape[1]//2, roi.shape[0]//2), (int(w*0.62), int(h*0.62)), 0, 0, 360, 1, -1)
        m = cv2.GaussianBlur(m, (0, 0), max(3, w*0.08))[..., None]
        img[y0:y1, x0:x1] = (blur * m + roi * (1 - m)).astype(np.uint8)
    cv2.imwrite(os.path.join(OUT, n), img, [cv2.IMWRITE_JPEG_QUALITY, 90])
print("done", len(glob.glob(os.path.join(OUT, "*.jpg"))))
