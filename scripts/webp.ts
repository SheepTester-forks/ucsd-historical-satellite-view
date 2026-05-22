// node scripts/webp.ts

import { exec as execCb } from "node:child_process";
import { access, mkdir, readdir, rename } from "node:fs/promises";
import { promisify } from "node:util";
import ProgressBar from "progress";

const [, , srcDir, destDir] = process.argv;
if (!srcDir || !destDir) {
  console.error("usage: node scripts/webp.ts <src> <dest>");
  process.exit(1);
}

const exec = promisify(execCb);

const needsWork: string[] = [];

console.warn("Scanning for work...");
for (const aerial of await readdir(srcDir)) {
  await mkdir(`${destDir}/${aerial}`, { recursive: true });
  for (const png of await readdir(`${srcDir}/${aerial}`)) {
    if (!png.endsWith(".png")) {
      continue;
    }
    try {
      await access(`${destDir}/${aerial}/${png}`);
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

if (needsWork.length === 0) {
  console.warn("No work needed");
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
      await exec(`cwebp ${srcDir}/${png} -o ${destDir}/${png}~`);
      await rename(`${destDir}/${png}~`, `${destDir}/${png}`);
      progress.tick();
    }
  }),
);
