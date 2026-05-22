// node scripts/webp.ts

import { exec as execCb } from "node:child_process";
import { access, mkdir, readdir, rename } from "node:fs/promises";
import { promisify } from "node:util";
import ProgressBar from "progress";

const exec = promisify(execCb);

const needsWork: string[] = [];

for (const aerial of await readdir("tiles_png")) {
  await mkdir(`tiles_webp/${aerial}`, { recursive: true });
  for (const png of await readdir(`tiles_png/${aerial}`)) {
    if (!png.endsWith(".png")) {
      continue;
    }
    try {
      await access(`tiles_webp/${aerial}/${png}`);
      continue;
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "ENOENT") {
        needsWork.push(`${aerial}/${png}`);
      } else {
        throw err;
      }
    }
  }
}

const CONC_LIMIT = 8;

const progress = new ProgressBar(`:current/:total :bar :elapseds (:rate/s)`, {
  total: needsWork.length,
});
await Promise.all(
  Array.from({ length: CONC_LIMIT }, async (_, i) => {
    for (const [j, png] of needsWork.entries()) {
      if (j % CONC_LIMIT !== i) {
        continue;
      }
      await exec(`cwebp tiles_png/${png} -o tiles_webp/${png}~`);
      await rename(`tiles_webp/${png}~`, `tiles_webp/${png}`);
      progress.tick();
    }
  }),
);
