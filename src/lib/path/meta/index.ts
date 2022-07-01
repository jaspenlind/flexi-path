import { normalize, parse } from "path";
import { Path, PathMeta } from "../../../types";
import { pathString } from "../parse";
import { depth } from "./depth";
import { equals } from "./equals";
import { exists } from "./exists";
import { hasRoot } from "./hasRoot";
import { isEmpty } from "./isEmpty";
import { isRoot } from "./isRoot";
import { isValid } from "./isValid";
import { segments } from "./segments";
import { type } from "./type";

export { depth } from "./depth";
export { exists } from "./exists";
export { equals } from "./equals";
export { hasRoot } from "./hasRoot";
export { isEmpty } from "./isEmpty";
export { isRoot } from "./isRoot";
export { isValid } from "./isValid";
export { readDir } from "./readDir";
export { segments } from "./segments";
export { stats } from "./stats";
export { type } from "./type";

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
