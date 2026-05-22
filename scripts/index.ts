import { access, constants, mkdir, stat } from "node:fs/promises";
import backgroundInfoJson from "../facts/backgroundInfo.json" with { type: "json" };
import backgroundZoomJson from "../facts/backgroundZoom.json" with { type: "json" };
import {
  getTileUrl,
  parseBackgroundInfo,
  parseBackgroundZoom,
  type BackgroundInfo,
} from "./lib/parse.ts";
import { finished } from "node:stream/promises";
import { Readable } from "node:stream";
import { createWriteStream } from "node:fs";

const backgroundInfo = parseBackgroundInfo(backgroundInfoJson).sort((a, b) =>
  a.name.localeCompare(b.name),
);
const backgroundZoom = Map.groupBy(
  parseBackgroundZoom(backgroundZoomJson),
  (zoom) => zoom.backgroundId,
);

const format = new Intl.NumberFormat();

async function ensureTilePng(
  layer: BackgroundInfo,
  zoom: number,
  x: number,
  y: number,
): Promise<string> {
  const dir = `tiles_png/${layer.name}`;
  const path = `${dir}/${x.toString().padStart(3, "0")}-${y.toString().padStart(3, "0")}.png`;

  try {
    await access(path, constants.F_OK);
    return path;
  } catch (err) {
    if (!(err instanceof Error && "code" in err && err.code === "ENOENT")) {
      throw err;
    }
  }

  mkdir(dir, { recursive: true });

  const response = await fetch(getTileUrl(layer, zoom, x, y));
  if (!response.ok) {
    console.error(await response.text().catch((err) => err));
    throw new Error(`HTTP ${response.status}: ${response.url}`);
  }
  if (!response.body) {
    throw new TypeError(`no body: ${response.url}`);
  }

  await finished(Readable.fromWeb(response.body).pipe(createWriteStream(path)));
  return path;
}

let totalTotalSize = 0;
for (const info of backgroundInfo) {
  if (!info.name.startsWith("Aerial")) {
    console.warn(`[${info.name}] skipped`);
    continue;
  }

  const maxZoomLevel = backgroundZoom
    .get(+info.backgroundId)
    ?.sort((a, b) => a.zoom - b.zoom)
    // For some reason zoom level 6 doesn't exist (did it before?)
    .filter((zoom) => zoom.zoom !== 6)
    .at(-1);
  if (!maxZoomLevel) {
    console.error(`[${info.name}] no zoom levels found`);
    continue;
  }
  const { zoom, tileCountX, tileCountY } = maxZoomLevel;
  if (zoom !== 5) {
    console.warn(`[${info.name}] interesting, zoom=${zoom}`);
  }

  const path = await ensureTilePng(info, zoom, 30, 30);
  const { size: tile0Size } = await stat(path);

  if (tileCountX >= 100) {
    console.warn(`[${info.name}] tileCountX=${tileCountX}`);
  }
  if (tileCountY >= 100) {
    console.warn(`[${info.name}] tileCountY=${tileCountY}`);
  }

  const tileCount = tileCountX * tileCountY;
  const totalSize = tileCount * tile0Size;
  totalTotalSize += totalSize;
  console.warn(
    `[${info.name}] ${tileCount} tiles, ~${format.format(tile0Size)} bytes per tile, so ${format.format(totalSize)} bytes total`,
  );
  console.warn(
    `[${info.name}] ${getTileUrl(info, zoom, tileCountX - 1, tileCountY - 1).href}`,
  );
}

console.warn(`${format.format(totalTotalSize)} bytes total total`);
