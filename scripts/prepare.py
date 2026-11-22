"""Copy + normalise uploaded photos into story order (raw/NN-name.jpg, max 1800px)."""
import os
from PIL import Image, ImageOps

U = "/root/.claude/uploads/c65ffc7e-1232-5740-967e-7b906cd7feff/"
OUT = os.path.join(os.path.dirname(__file__), "..", "raw")

# (story slug, upload file, original name)
STORY = [
    ("flatlay",     "01a70c16", "IMG_0532"),
    ("banner",      "836d2d47", "IMG_0538"),
    ("start",       "087c2968", "IMG_0542"),
    ("selfie",      "57eace87", "IMG_0533"),
    ("plushwalk",   "9c08be16", "IMG_0544"),
    ("km1",         "ce1d4f22", "IMG_0562"),
    ("piplup",      "0513468a", "IMG_0571"),
    ("snorlax",     "12485861", "IMG_0573"),
    ("glaceon",     "4df4496a", "IMG_0572"),
    ("km2",         "eda7bcaf", "IMG_0585"),
    ("sylveon",     "47cd3e90", "IMG_0589"),
    ("charizard",   "884b7f25", "IMG_0609"),
    ("km3",         "6025ae5d", "IMG_0610"),
    ("ceruledge",   "5fdca8a0", "IMG_0614"),
    ("tents",       "e97ca404", "IMG_0619"),
    ("km4",         "5dc2000c", "IMG_0623"),
    ("finish-wide", "d0854af9", "IMG_0626"),
    ("finish-me",   "6bafab70", "2da861f9"),  # cut from the edit
    ("card",        "52e5b4e7", "IMG_0628"),
    ("inflatable",  "635da08d", "IMG_0631"),
    ("me-inflatable","3b9ec6a4","IMG_9164"),
    ("me-point",    "8172128e", "IMG_9163"),
    ("cards",       "c2f0dff9", "IMG_0651"),
    ("medal",       "4cc2508a", "IMG_0652"),
    ("plush",       "08a11a65", "IMG_0653"),
    ("end-me",      "28c603bd", "IMG_9168"),   # closing scene
]

os.makedirs(OUT, exist_ok=True)
for i, (slug, uid, orig) in enumerate(STORY, 1):
    im = ImageOps.exif_transpose(Image.open(f"{U}{uid}-image.jpg")).convert("RGB")
    im.thumbnail((1800, 1800), Image.LANCZOS)
    p = os.path.join(OUT, f"{i:02d}-{slug}.jpg")
    im.save(p, quality=92)
    print(p, im.size)
