import { Dirent, existsSync, lstatSync, readdirSync, Stats } from "fs";
import nodePath from "path";

import flexi, { FlexiPath, Path, PathType } from "..";
import children from "./children";
import concat from "./concat";
import cut from "./cut";
import diff from "./diff";
import equals from "./equals";
import except from "./except";
import files from "./files";
import flatten from "./flatten";
import intersect from "./intersect";
import parent from "./parent";
import parse from "./parse";
import prepend from "./prepend";
import reverse from "./reverse";
import subDirectories from "./subDirectories";
import type from "./type";
import write from "./write";

export { default as parse } from "./parse";
export { default as resolver } from "./resolve";
export { default as write } from "./write";
export { default as type } from "./type";
export { default as concat } from "./concat";
export { default as prepend } from "./prepend";
export { default as flatten } from "./flatten";
export { default as reverse } from "./reverse";
export { default as intersect } from "./intersect";
export { default as except } from "./except";

/**
 * `boolean` value indicating if the `path` exists or not
 * @category path
 */
export const exists = (current: Path) => existsSync(parse(current).path);
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
/**
 * `boolean` value indicating if the `path` is [[empty]]
 * @category path
 */
export const isEmpty = (path: Path | null): boolean =>
  path === null || parse(path).path === flexi.empty().path;

/**
 * @ignore
 */
export const constants = {
  empty: "",
  root: nodePath.sep,
  sep: nodePath.sep
};

/**
 * `boolean` value representing if the `path` can be created on the disk
 * @category path
 */
export const isValid = (path: Path): boolean =>
  parse(path).root !== constants.empty;

/**
 * `boolean` value indicating if the `path` is a `root` path
 * @category path
 */
export const isRoot = (path: Path) => parse(path).path === constants.sep;
/**
 * `boolean` value indicating the path has a [[root]]
 * @category path
 */
export const hasRoot = (path: Path) => parse(path).root === constants.sep;
/**
 * Creates a new `path`
 * @category path
 * @param current A `string` representation of a valid file path or any arbitrary path
 */
export const path = (current: Path): FlexiPath => {
  const pathAsString =
    typeof current === "string" ? (current as string) : parse(current).path;
  const normalizedPath = nodePath.normalize(pathAsString);
  const { root, dir, ext, base, name } = nodePath.parse(normalizedPath);
  const getParent = parent(normalizedPath);
  // const getSubDirectories = subDirectories(normalizedPath);
  const getDepth = () => {
    const levels = normalizedPath.split(constants.sep);
    if (normalizedPath.endsWith(constants.sep)) {
      levels.pop();
    }

    return levels.length - 1;
  };

  const api: FlexiPath = {
    append: (...paths: Path[]) => concat(normalizedPath, ...paths),
    base,
    children: children(normalizedPath),
    cut: (count: number) => cut(normalizedPath, count),
    depth: getDepth(),
    diff: (other: Path) => diff(normalizedPath, other),
    dir,
    equals: (other: Path, options?: { ignoreFileExtension?: boolean }) =>
      equals(normalizedPath, other, options),
    except: (...paths: Path[]) => except(normalizedPath, ...paths),
    exists: () => exists(normalizedPath),
    ext,
    files: files(normalizedPath),
    flatten: () => flatten(normalizedPath),
    hasRoot: () => hasRoot(normalizedPath),
    intersect: (...paths: Path[]) => intersect(normalizedPath, ...paths),
    isEmpty: () => isEmpty(normalizedPath),
    isRoot: () => isRoot(normalizedPath),
    isValid: () => isValid(normalizedPath),
    name,
    parent: (query?: any): any => getParent(query),
    path: normalizedPath,
    prepend: (...paths: Path[]) => prepend(normalizedPath, ...paths),
    reverse: () => reverse(normalizedPath),
    root,
    subDirectories: subDirectories(normalizedPath),
    type: () => type(normalizedPath),
    write: () => write(normalizedPath)
  };

  return api;
};

export default path;
