/**
 * @file
 * Usage: node scripts/concept3d/index.ts <tileset> <zoom>
 *
 * Based on https://sheeptester.github.io/words-go-here/misc/ucsd-map.html
 *
 * - node scripts/concept3d/index.ts UCSD_MasterUpdated-03-28-2019 21
 * - node scripts/concept3d/index.ts mrg2020-01-08_1005_Labels_2overlays 21
 * - node scripts/concept3d/index.ts 1005_Map_69fce94e12df9 20
 * - node scripts/concept3d/index.ts 1005_BuildingLabels_69fce9d8df886 20
 */

import { ensureTile, latLngToTile, type Point } from "./lib.ts";

if (process.argv.length < 4) {
  console.error(`usage: node scripts/concept3d/index.ts <tileset> <zoom>`);
  process.exit(1);
}

const [, , tileSet, zoomStr] = process.argv;
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

const added = new Map<number, Set<number>>();
let count = 0;

const stack = Object.entries(starts).map(async ([name, [lat, long]]) => {
  const point = latLngToTile(lat, long, zoom);
  added.getOrInsertComputed(point.x, () => new Set()).add(point.y);
  count++;
  const isEmpty = await ensureTile(tileSet, zoom, point);
  if (isEmpty) {
    console.warn(`warn: start point '${name}' is empty`);
  }
  return isEmpty ? null : point;
});

let next;
while ((next = stack.pop())) {
  process.stderr.write(
    `\rvisited: ${count} | stack: ${stack.length}`.padEnd(80),
  );
  const point = await next;
  if (!point) {
    continue;
  }
  for (const [dx, dy] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]) {
    const neighbor = { x: point.x + dx, y: point.y + dy };
    if (!added.get(neighbor.x)?.has(neighbor.y)) {
      added.getOrInsertComputed(neighbor.x, () => new Set()).add(neighbor.y);
      count++;
      stack.push(
        ensureTile(tileSet, zoom, neighbor).then((empty) =>
          empty ? null : neighbor,
        ),
      );
    }
  }
}
