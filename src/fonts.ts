import { continueRender, delayRender, staticFile } from "remotion";

const faces: [string, string, string][] = [
  ["Lilita One", "fonts/lilita-one-latin-400-normal.woff2", "400"],
  ["Nunito", "fonts/nunito-latin-700-normal.woff2", "700"],
  ["Nunito", "fonts/nunito-latin-800-normal.woff2", "800"],
];

const handle = delayRender("Loading fonts");
Promise.all(
  faces.map(([family, file, weight]) =>
    new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight }).load().then((f) => {
      (document.fonts as unknown as { add(f: FontFace): void }).add(f);
    }),
  ),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error("Font load failed", err);
    continueRender(handle);
  });
