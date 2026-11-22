import { Config } from "@remotion/cli/config";
import fs from "node:fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Use a pre-installed Chromium when one is available (e.g. cloud sandboxes).
for (const p of ["/opt/pw-browsers/chromium_headless_shell", "/opt/pw-browsers/chromium", process.env.REMOTION_BROWSER ?? ""]) {
  if (p && fs.existsSync(p)) {
    Config.setBrowserExecutable(p);
    break;
  }
}
