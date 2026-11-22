// Usage: node scripts/covers.mjs  → out/covers/xhs-cover-{a,b}.png (1242x1656, 3:4)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const browserExecutable = ["/opt/pw-browsers/chromium_headless_shell", "/opt/pw-browsers/chromium"].find((p) => fs.existsSync(p));
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("public") });
fs.mkdirSync("out/covers", { recursive: true });
for (const [id, name] of [["XhsCoverA", "xhs-cover-a.png"], ["XhsCoverB", "xhs-cover-b.png"]]) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  const output = path.join("out/covers", name);
  await renderStill({ composition, serveUrl, frame: 0, output, imageFormat: "png", scale: 1.15, browserExecutable });
  console.log("cover", output);
}
