import nodePath from "path";
import { existsSync, readdirSync, Dirent, Stats, lstatSync } from "fs";
import flexi, { FlexiPath, Path, PathType } from "../..";
import files from "../files";
import subDirectories from "../subDirectories";
import parent from "../parent";
import parse from "./parse";
import diff from "./diff";
import write from "./write";
import type from "./type";
import concat from "./concat";
import prepend from "./prepend";
import flatten from "./flatten";
import reverse from "./reverse";
import intersect from "./intersect";
import except from "./except";
import cut from "./cut";

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
  sep: nodePath.sep,
  root: nodePath.sep,
  empty: ""
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
  const getSubDirectories = subDirectories(normalizedPath);

  const api: FlexiPath = {
    root,
    dir,
    ext,
    base,
    name,
    path: normalizedPath,
    isRoot: () => isRoot(normalizedPath),
    hasRoot: () => hasRoot(normalizedPath),
    exists: () => exists(normalizedPath),
    isEmpty: () => isEmpty(normalizedPath),
    isValid: () => isValid(normalizedPath),
    type: () => type(normalizedPath),
    parent: (query?: any): any => getParent(query),
    subDirectories: (directoryName?: any): any =>
      getSubDirectories(directoryName),
    files: () => files(normalizedPath),
    append: (...paths: Path[]) => concat(normalizedPath, ...paths),
    prepend: (...paths: Path[]) => prepend(normalizedPath, ...paths),
    diff: (other: Path) => diff(normalizedPath, other),
    reverse: () => reverse(normalizedPath),
    write: () => write(normalizedPath),
    flatten: () => flatten(normalizedPath),
    cut: (count: number) => cut(normalizedPath, count),
    intersect: (...paths: Path[]) => intersect(normalizedPath, ...paths),
    except: (...paths: Path[]) => except(normalizedPath, ...paths),
    depth: () => flatten(normalizedPath).length
  };

  return api;
};

export default path;
