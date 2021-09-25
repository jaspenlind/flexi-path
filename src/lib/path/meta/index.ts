import { normalize, parse } from "path";

import { Path, PathMeta } from "../../../types";
import { pathString } from "../parse";
import depth from "./depth";
import equals from "./equals";
import exists from "./exists";
import hasRoot from "./hasRoot";
import isEmpty from "./isEmpty";
import isRoot from "./isRoot";
import isValid from "./isValid";
import segments from "./segments";
import type from "./type";

export { default as depth } from "./depth";
export { default as exists } from "./exists";
export { default as equals } from "./equals";
export { default as hasRoot } from "./hasRoot";
export { default as isEmpty } from "./isEmpty";
export { default as isRoot } from "./isRoot";
export { default as isValid } from "./isValid";
export { default as readDir } from "./readDir";
export { default as segments } from "./segments";
export { default as stats } from "./stats";
export { default as type } from "./type";

/**
 * Returns metadata for a path
 * @category path
 * @param path The `path` to get metadata for
 */
const meta = (path: Path): PathMeta => {
  const stringPath = pathString(path);

  const normalizedPath = normalize(stringPath);

  const { base, dir, ext, name, root } = parse(normalizedPath);

  return Object.freeze({
    base,
    depth: depth(normalizedPath),
    dir,
    equals: (other: Path, options?: { ignoreFileExtension?: boolean }) =>
      equals(normalizedPath, pathString(other), options),
    exists: () => exists(normalizedPath),
    ext,
    hasRoot: () => hasRoot(normalizedPath),
    isEmpty: () => isEmpty(normalizedPath),
    isRoot: () => isRoot(normalizedPath),
    isValid: () => isValid(normalizedPath),
    name,
    path: normalizedPath,
    root,
    segments: segments(normalizedPath),
    type: () => type(normalizedPath)
  });
};

/** @ignore */
let emptyMeta: PathMeta;

/** @category path */
export const empty = (): PathMeta => {
  if (typeof emptyMeta === "undefined") {
    emptyMeta = meta("");
  }

  return emptyMeta;
};

export default meta;
