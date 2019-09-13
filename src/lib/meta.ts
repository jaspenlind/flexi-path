import { Dirent, existsSync, lstatSync, readdirSync, Stats } from "fs";
import nodePath from "path";

import flexi, { Path, PathMeta, PathType } from "..";
import depth from "./depth";
import equals from "./equals";
import parse from "./parse";
import pathString from "./pathString";
import type from "./type";

/**
 * @ignore
 */
export const constants = {
  empty: "",
  root: nodePath.sep,
  sep: nodePath.sep
};

/**
 * `boolean` value indicating if the `path` exists or not
 * @category path
 */
export const exists = (path: Path) => existsSync(pathString(path));

/**
 * `boolean` value indicating if the `path` is a `root` path
 * @category path
 */
export const isRoot = (path: Path) => pathString(path) === constants.sep;

/**
 * `boolean` value indicating if the `path` is [[empty]]
 * @category path
 */
export const isEmpty = (path: Path | null): boolean =>
  path === null || flexi.path(path).path === flexi.empty().path;

/**
 * `boolean` value representing if the `path` can be created on the disk
 * @category path
 */
export const isValid = (path: Path): boolean =>
  nodePath.parse(pathString(path)).root !== constants.empty;

/**
 * `boolean` value indicating the path has a [[root]]
 * @category path
 */
export const hasRoot = (path: Path) =>
  nodePath.parse(pathString(path)).root === constants.sep;

/**
 * @ignore
 */
export const stats = (path: Path): Stats | null =>
  (exists(path) && lstatSync(parse(path).path)) || null;

/**
 * @ignore
 */
export const readDir = (path: string): Dirent[] =>
  (exists(path) &&
    type(path) === PathType.Directory &&
    readdirSync(path, { withFileTypes: true })) ||
  [];

/**
 * Returns metadata for a path
 * @category path
 * @param path The `path` to get metadata for
 */
const meta = (path: Path): PathMeta => {
  const stringPath = pathString(path);

  const normalizedPath = nodePath.normalize(stringPath);

  const { base, dir, ext, name, root } = nodePath.parse(normalizedPath);

  return Object.freeze({
    base,
    depth: depth(normalizedPath),
    dir,
    exists: () => exists(normalizedPath),
    ext,
    equals: (other: Path, options?: { ignoreFileExtension?: boolean }) =>
      equals(normalizedPath, other, options),
    hasRoot: () => hasRoot(normalizedPath),
    isEmpty: () => isEmpty(normalizedPath),
    isRoot: () => isRoot(normalizedPath),
    isValid: () => isValid(normalizedPath),
    name,
    path: normalizedPath,
    root,
    type: () => type(normalizedPath)
  });
};

let emptyMeta: PathMeta;

export const empty = () => {
  if (emptyMeta === undefined) {
    emptyMeta = meta("");
  }

  return emptyMeta;
};

export default meta;
