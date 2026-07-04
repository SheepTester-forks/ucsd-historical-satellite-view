import { createWriteStream } from "node:fs";
import { access, constants, mkdir, open, rename } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { ConcurrencyLimiter } from "../lib/ConcurrencyLimiter.ts";

export type Point = { x: number; y: number };

const RADIUS = 6378137;
/** CSS pixel size of tile */
const TILE_SIZE = 256;
export function latLngToTile(
  latitude: number,
  longitude: number,
  zoom: number,
): Point {
  const sine = Math.sin((latitude * Math.PI) / 180);
  const projectedX = (RADIUS * longitude * Math.PI) / 180;
  const projectedY = (RADIUS * Math.log((1 + sine) / (1 - sine))) / 2;
  const zoomScale = 256 * 2 ** zoom;
  const projectScale = 0.5 / (Math.PI * RADIUS);
  const pointX = zoomScale * (projectScale * projectedX + 0.5);
  const pointY = zoomScale * (projectScale * projectedY + 0.5);
  return {
    x: Math.floor(pointX / TILE_SIZE),
    y: Math.floor(pointY / TILE_SIZE),
  };
}

const UCSD_MAP_ID = "1005";
const getTileUrl = (tileSet: string, zoom: number, x: number, y: number) =>
  `https://assets.concept3d.com/assets/${UCSD_MAP_ID}/${tileSet}/${zoom}/${x}/${y}`;

const limiter = new ConcurrencyLimiter(32);

/** Etag header value used for empty tiles */
const EMPTY_ETAG = '"3b81a1fbab29e22d62a39c8aaf65f1ab"';

/**
 * @returns Whether the tile is empty.
 */
export async function ensureTile(
  tileSet: string,
  zoom: number,
  { x, y }: Point,
): Promise<boolean> {
  const cacheDir = join(
    "concept3d_png",
    tileSet,
    zoom.toString(),
    x.toString(),
  );
  const cachePathEmpty = join(cacheDir, `${y}.empty`);
  const cachePathExists = join(cacheDir, `${y}.png`);

  try {
    await access(cachePathExists, constants.F_OK);
    return false;
  } catch (err) {
    if (!(err instanceof Error && "code" in err && err.code === "ENOENT")) {
      throw err;
    }
  }

  try {
    await access(cachePathEmpty, constants.F_OK);
    return true;
  } catch (err) {
    if (!(err instanceof Error && "code" in err && err.code === "ENOENT")) {
      throw err;
    }
  }

  mkdir(cacheDir, { recursive: true });

  let isEmpty;
  fetch: {
    using stack = new DisposableStack();
    stack.use(await limiter.acquire());

    const response = await fetch(getTileUrl(tileSet, zoom, x, y), {
      headers: { "if-none-match": EMPTY_ETAG },
    });

    isEmpty = response.status === 304;
    if (isEmpty) {
      break fetch;
    }

    if (!response.ok) {
      console.error(
        await response
          .text()
          .catch(
            (cause) =>
              new Error("Failed to read failing response body", { cause }),
          ),
      );
      throw new Error(`HTTP ${response.status}: ${response.url}`);
    }
    if (!response.body) {
      throw new TypeError(`no body: ${response.url}`);
    }
    await finished(
      Readable.fromWeb(response.body).pipe(
        createWriteStream(`${cachePathExists}~`),
      ),
    );
    await rename(`${cachePathExists}~`, cachePathExists);
  }
  if (isEmpty) {
    // wx = fail if file exists
    const file = await open(cachePathEmpty, "wx");
    await file.close();
  }
  return isEmpty;
}
