import { join } from "path";
import shell from "shelljs";
import { Stats, existsSync, lstatSync, readdirSync, Dirent } from "fs";
import flexi, { Path, PathWithBasePath, PathType, FlexiPath } from ".";

export const empty = "";

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

export const concat = (path: Path, ...paths: Path[]): FlexiPath => {
  const initial = parse(path).path;

  const result = (paths || []).reduce<string>((prev: string, current: Path) => {
    return join(prev, parse(current).path);
  }, initial);

  return flexi.path(result);
};

export const isEmpty = (path: Path | null): boolean =>
  path === null || parse(path).path === flexi.empty().path;

export const root = "/";

export const isValid = (path: Path): boolean => parse(path).root !== "";

export const isRoot = (path: Path) => parse(path).path === root;

export const exists = (path: Path) => existsSync(parse(path).path);

export const stats = (path: Path): Stats | null =>
  (exists(path) && lstatSync(parse(path).path)) || null;

export const guessType = (path: Path): PathType => {
  const parsed = parse(path);
  if (!isValid(parsed)) {
    return PathType.Unknown;
  }
  const maybeFile =
    // (parsed.dir.split(/\/|\\/).length > 1 ||
    (parsed.ext !== "" || !parsed.path.match(/\/|\\$/)) &&
    parsed.parent() !== null;

  return maybeFile ? PathType.File : PathType.Directory;
};

export const type = (path: Path): PathType => {
  if (!exists(path)) {
    return guessType(path);
  }

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

export const write = (path: Path): void => {
  const parsed = parse(path);
  const parsedType = type(parsed);

  if (parsedType === PathType.Unknown) {
    throw new Error("Path is not valid or type cannot be determined");
  }

  if (exists(parsed)) {
    throw new Error("Path already exists");
  }

  if (parsedType === PathType.Directory) {
    shell.mkdir("-p", parsed.path);
  } else {
    const parsedParent = parsed.parent();
    if (parsedParent) {
      if (!parsedParent.exists()) {
        shell.mkdir("-p", parsedParent.path);
      }
      shell.touch(parsed.path);
    }
  }
};

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
    /**
     * Concatinates multiple `path` objects into a new `path`
     */
    concat: (...paths: Path[]) => concat(currentPath, ...paths),
    stats: () => stats(currentPath),
    /**
     * `PathType` enum. Possible values: [`Directory`|`File`|`Unknown`]. A `path` that doesn't exist
     * on disk is `Unknown`
     */
    type: () => type(currentPath),
    readDir: () => readDir(currentPath),
    /**
     * Writes the current `path` to disk if possible
     */
    write: () => write(currentPath)
  };
};

export default path;
