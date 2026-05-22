import * as z from "zod";

const basePath = "/tdb/Mapping/CampusMap/";

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
      basePath: `${basePath}${name}/~${h}`,
      thumbnailPath: r,
      thumbOffsetX: j,
      thumbOffsetY: i,
      // I,
      // K,
      // J,
    }));

const backgroundZoomSchema = z.tuple([z.int(), z.int(), z.int(), z.int()]);
export const parseBackgroundZoom = (json: unknown) =>
  z
    .array(backgroundZoomSchema)
    .parse(json)
    .map(([prefix, postfix, height, width]) => ({
      backgroundId: prefix,
      zoom: postfix,
      height,
      width,
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
