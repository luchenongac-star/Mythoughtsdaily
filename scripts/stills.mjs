// Usage: node scripts/stills.mjs <outDir> <frame> [<frame> ...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const [outDir, ...frames] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browserExecutable = ["/opt/pw-browsers/chromium_headless_shell", "/opt/pw-browsers/chromium"].find((p) => fs.existsSync(p));
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id: "DayVlog", browserExecutable });
for (const f of frames) {
  const output = path.join(outDir, `f${String(f).padStart(4, "0")}.jpg`);
  await renderStill({ composition, serveUrl, frame: Number(f), output, imageFormat: "jpeg", jpegQuality: 80, browserExecutable });
  console.log("still", output);
}
