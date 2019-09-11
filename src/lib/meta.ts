import { Dirent, existsSync, lstatSync, readdirSync, Stats } from "fs";
import nodePath from "path";

import flexi, { Path, PathMeta, PathType } from "..";
import depth from "./depth";
import equals from "./equals";
import parse from "./parse";
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
export const exists = (current: Path) => existsSync(flexi.path(current).path);

/**
 * `boolean` value indicating if the `path` is a `root` path
 * @category path
 */
export const isRoot = (path: Path) => flexi.path(path).path === constants.sep;

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
  flexi.path(path).root !== constants.empty;

/**
 * `boolean` value indicating the path has a [[root]]
 * @category path
 */
export const hasRoot = (path: Path) => parse(path).root === constants.sep;

/**
 * @ignore
 */
export const stats = (current: Path): Stats | null =>
  (exists(current) && lstatSync(parse(current).path)) || null;

/**
 * @ignore
 */
export const readDir = (current: Path): Dirent[] =>
  (exists(current) &&
    type(current) === PathType.Directory &&
    readdirSync(parse(current).path, { withFileTypes: true })) ||
  [];

const meta = (path: Path): PathMeta => {
  const stringPath =
    typeof path === "string" ? (path as string) : parse(path).path;

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

export default meta;
