import { join } from "path";
import { Stats, existsSync, lstatSync, readdirSync, Dirent } from "fs";
import flexi, { Path, PathWithBasePath, PathType, FlexiPath } from ".";

export const empty = (): FlexiPath => flexi.path("");

export const parse = (path: Path): FlexiPath => {
  let parsed: FlexiPath | undefined;
  if (typeof path === "object") {
    const pathWithBasePath = path as PathWithBasePath;
    if (typeof pathWithBasePath.basePath !== "undefined") {
      const basePath = parse(pathWithBasePath.basePath);
      const currentPath = parse(pathWithBasePath.path);
      parsed = flexi.path(join(basePath.path, currentPath.path));
    } else {
      parsed = path as FlexiPath;
    }
  }

  return parsed || flexi.path(path as string);
};

export const isEmpty = (path: Path | null): boolean =>
  path === null || parse(path).path === empty().path;

export const root = "/";

export const isValid = (path: Path): boolean => parse(path).root === root;

export const isRoot = (path: Path) => parse(path).path === root;

export const exists = (path: Path) => existsSync(parse(path).path);

export const stats = (path: Path): Stats | null =>
  (exists(path) && lstatSync(parse(path).path)) || null;

export const type = (path: Path): PathType => {
  const stat = stats(path);

  return (
    (stat && stat.isDirectory() && PathType.Directory) ||
    (stat && stat.isFile() && PathType.File) ||
    PathType.Unknown
  );
};

export const readDir = (path: Path): Dirent[] =>
  (exists(path) &&
    type(path) === PathType.Directory &&
    readdirSync(parse(path).path, { withFileTypes: true })) ||
  [];

/**
 *
 * @param currentPath Path utility function
 */
export const path = (currentPath: Path) => {
  return {
    /**
     * Parses a `Path`to a `flexi.Path`
     */
    parse,
    /**
     * A `path` representing the `root`
     */
    root,
    /**
     * `boolean` value representing if the `path` can be created on the disk
     */
    isValid: () => isValid(currentPath),
    /**
     * `boolean` value indicating if the `path` is a `root` path
     */
    isRoot: () => isRoot(currentPath),
    /**
     * `boolan` value indicatinf if the `path`is empty
     */
    isEmpty: () => isEmpty(currentPath),
    /**
     * `boolean` value indicating if the `path` exists or not
     */
    exists: () => exists(currentPath),
    stats: () => stats(currentPath),
    /**
     * `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
     * on disk is `Unknown`
     */
    type: () => type(currentPath),
    readDir: () => readDir(currentPath)
  };
};

export default path;
