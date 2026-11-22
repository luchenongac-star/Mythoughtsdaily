import { continueRender, delayRender, staticFile } from "remotion";
import slices from "./zcoolSlices.json";
import "../fonts";

// ZCOOL KuaiLe (OFL) – only the slices needed for the cover text (see scripts/build_cover_font.py).
const handle = delayRender("Loading cover fonts");
Promise.all(
  slices.map((s) =>
    new FontFace("ZCOOL KuaiLe", `url(${staticFile(`fonts/zcool/${s.file}`)}) format('woff2')`, { unicodeRange: s.range })
      .load()
      .then((f) => (document.fonts as unknown as { add(f: FontFace): void }).add(f)),
  ),
)
  .then(() => continueRender(handle))
  .catch((e) => {
    console.error("cover font load failed", e);
    continueRender(handle);
  });

export const ZH = "'ZCOOL KuaiLe', 'WenQuanYi Zen Hei', sans-serif";
