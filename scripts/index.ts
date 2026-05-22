import backgroundInfoJson from "../facts/backgroundInfo.json" with { type: "json" };
import backgroundZoomJson from "../facts/backgroundZoom.json" with { type: "json" };
import {
  getTileUrl,
  parseBackgroundInfo,
  parseBackgroundZoom,
} from "./lib/parse.ts";

const backgroundInfo = parseBackgroundInfo(backgroundInfoJson).sort((a, b) =>
  a.name.localeCompare(b.name),
);
const backgroundZoom = Map.groupBy(
  parseBackgroundZoom(backgroundZoomJson),
  (zoom) => zoom.backgroundId,
);

const format = new Intl.NumberFormat();

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

  const r = await fetch(getTileUrl(info, zoom, 30, 30));
  await r.body?.cancel("bruh");
  const tile0Size = +(r.headers.get("content-length") ?? "");

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
