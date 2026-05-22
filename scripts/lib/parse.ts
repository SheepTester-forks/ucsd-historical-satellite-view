import * as z from "zod";

const domain = "https://maps.ucsd.edu/";
const basePath = "/tdb/Mapping/CampusMap";
const TILE_SIZE = 256;

const zoomInfoSchema = z.tuple([z.int(), z.string(), z.int(), z.int()]);
export const parseZoomInfo = (json: unknown) =>
  z
    .array(zoomInfoSchema)
    .parse(json)
    .map(([prefix, postfix, height, width]) => ({
      zoom: prefix,
      layer: postfix,
      height,
      width,
    }));

const backgroundInfoSchema = z.tuple([
  z.string(),
  z.templateLiteral([z.int()]),
  z.int(),
  z.number(),
  z.number(),
  z.string(),
  z.int(),
  z.int(),
  z.string(),
  z.int(),
  z.int(),
  z.templateLiteral([z.bigint()]),
]);
export const parseBackgroundInfo = (json: unknown) =>
  z
    .array(backgroundInfoSchema)
    .parse(json)
    .map(([name, c, visible, offsetX, offsetY, r, j, i, I, K, J, h]) => ({
      name,
      backgroundId: c,
      visible,
      offsetX,
      offsetY,
      timestamp: h,
      thumbnailPath: r,
      thumbOffsetX: j,
      thumbOffsetY: i,
      // I,
      // K,
      // J,
    }));
export type BackgroundInfo = ReturnType<typeof parseBackgroundInfo>[number];

const backgroundZoomSchema = z.tuple([z.int(), z.int(), z.int(), z.int()]);
export const parseBackgroundZoom = (json: unknown) =>
  z
    .array(backgroundZoomSchema)
    .parse(json)
    .map(([prefix, postfix, height, width]) => ({
      backgroundId: prefix,
      zoom: postfix,
      tileCountY: Math.ceil(height / TILE_SIZE),
      tileCountX: Math.ceil(width / TILE_SIZE),
    }));

const centerInfoSchema = z.tuple([
  z.templateLiteral([z.int(), "%", z.int()]),
  z.number(),
  z.number(),
]);
export const parseCenterInfo = (json: unknown) =>
  z
    .array(centerInfoSchema)
    .parse(json)
    .map(([key, f, g]) => ({ key, tilesX: f, tilesY: g }));

export const getTileUrl = (
  layer: BackgroundInfo,
  zoom: number,
  x: number,
  y: number,
) =>
  new URL(
    // The ~ part seems to be ignored
    `${basePath}/${layer.name}/${zoom}/${y}/${x}.png`,
    domain,
  );
