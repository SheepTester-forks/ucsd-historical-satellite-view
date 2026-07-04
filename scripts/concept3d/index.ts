/**
 * @file
 * Usage: node scripts/concept3d/index.ts <tileset> <zoom> [labels-tileset]
 *
 * Uses DFS from the starting points defined below to cache every map tile.
 *
 * Based on https://sheeptester.github.io/words-go-here/misc/ucsd-map.html
 *
 * - node scripts/concept3d/index.ts UCSD_MasterUpdated-03-28-2019 21 mrg2020-01-08_1005_Labels_2overlays
 * - node scripts/concept3d/index.ts 1005_Map_69fce94e12df9 20 1005_BuildingLabels_69fce9d8df886
 */

import { mkdir, writeFile } from "node:fs/promises";
import { ensureTile, latLngToTile, type Point } from "./lib.ts";
import { join } from "node:path";

if (process.argv.length < 4) {
  console.error(
    `usage: node scripts/concept3d/index.ts <tileset> <zoom> [labels-tileset]`,
  );
  process.exit(1);
}

const [, , tileSet, zoomStr, labelsTileset] = process.argv;
const zoom = +zoomStr;

const starts: Record<string, [lat: number, long: number]> = {
  "Center Hall": [32.877341347399, -117.23531663418],
  "Khosla's Mansion": [32.87953515838398, -117.24861410892244],
  "La Jolla del Sol": [32.86537664805272, -117.22337833473418],
  Hillcrest: [32.75418392267715, -117.16593999887506],
  "Park & Market": [32.711800405307606, -117.15431461528293],
  Surplus: [32.88827021072714, -117.15091613573367],
  "East Campus Medical Center": [32.776609103331246, -117.05706916634533],
};

const added: Record<number, Set<number>> = {};
let count = 0;
const emptyCells = new Set<`${number}, ${number}`>();

const stack = Object.entries(starts).map(async ([name, [lat, long]]) => {
  const point = latLngToTile(lat, long, zoom);
  added[point.x] ??= new Set();
  added[point.x].add(point.y);
  count++;
  const isEmpty = await ensureTile(tileSet, zoom, point);
  if (isEmpty) {
    console.warn(`warn: start point '${name}' is empty`);
  }
  return { ...point, isEmpty };
});

let labelsDone = 0;
const printStats = () =>
  `\rvisited: ${count} | empty: ${emptyCells.size} | stack: ${stack.length} | labels done: ${labelsDone}`.padEnd(
    80,
  );

const labelPromises: Promise<Point & { isEmpty: boolean }>[] = [];
let next;
while ((next = stack.pop())) {
  process.stderr.write(printStats());
  const point = await next;
  if (point.isEmpty) {
    emptyCells.add(`${point.x}, ${point.y}`);
    continue;
  }
  if (labelsTileset) {
    labelPromises.push(
      ensureTile(labelsTileset, zoom, point).then((isEmpty) => {
        labelsDone++;
        process.stderr.write(printStats());
        return {
          ...point,
          isEmpty,
        };
      }),
    );
  }
  for (const dx of [-1, 0, 1]) {
    for (const dy of [-1, 0, 1]) {
      const manDist = Math.abs(dx) + Math.abs(dy);
      if (manDist !== 1) {
        continue;
      }
      const neighbor = { x: point.x + dx, y: point.y + dy };
      if (!added[neighbor.x]?.has(neighbor.y)) {
        added[neighbor.x] ??= new Set();
        added[neighbor.x].add(neighbor.y);
        count++;
        stack.push(
          ensureTile(tileSet, zoom, neighbor).then((isEmpty) => ({
            ...neighbor,
            isEmpty,
          })),
        );
      }
    }
  }
}

const labelsNonempty = new Set(
  (await Promise.all(labelPromises))
    .values()
    .filter((point) => !point.isEmpty)
    .map(({ x, y }) => `${x}, ${y}` as const),
);

console.log(printStats());

const bounds = Object.entries(added)
  .values()
  .map(([x, ys]) => ({ x: +x, ys }))
  .flatMap(({ x, ys }) => ys.values().map((y) => ({ x, y })))
  .reduce(
    (cum, curr) => ({
      minX: Math.min(cum.minX, curr.x),
      maxX: Math.max(cum.maxX, curr.x),
      minY: Math.min(cum.minY, curr.y),
      maxY: Math.max(cum.maxY, curr.y),
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
  );
let str = `total: ${count} | empty: ${emptyCells.size} | labels: ${labelsNonempty.size}\n`;
for (let y = bounds.maxY; y >= bounds.minY; y--) {
  let line = "";
  for (let x = bounds.minX; x <= bounds.maxX; x++) {
    line += added[x]?.has(y)
      ? emptyCells.has(`${x}, ${y}`)
        ? "."
        : labelsNonempty.has(`${x}, ${y}`)
          ? "="
          : "-"
      : " ";
  }
  str += line.trimEnd() + "\n";
}
await mkdir(join("scripts", "concept3d", "reports"), { recursive: true });
await writeFile(join("scripts", "concept3d", "reports", `${tileSet}.txt`), str);
