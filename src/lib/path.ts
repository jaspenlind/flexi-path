import { join, sep } from "path";
import shell from "shelljs";
import { Stats, existsSync, lstatSync, readdirSync, Dirent } from "fs";
import flexi, { Path, PathWithBasePath, PathType, FlexiPath } from "..";
import strategies from "./resolve/strategies";
import walker from "./walker";
import { diff as diffPath } from "./resolve";

export const empty = "";

export const parse = (path: Path): FlexiPath => {
  let parsed: FlexiPath | undefined;
  if (Array.isArray(path)) {
    return flexi.path(join(...path));
  }

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

export const cut = (path: Path, count: number): FlexiPath => {
  return flexi.resolve(path, strategies.cut(count)) || flexi.empty();
};

const flatReduce = (
  filter: (prev: string[], current: string[]) => string[],
  path: Path,
  ...paths: Path[]
): FlexiPath => {
  const parsedPath = parse(path);
  const parsedPaths = (paths || []).map(x => parse(x));

  if (parsedPath.isEmpty() || parsedPaths.find(x => x.isEmpty())) {
    return flexi.empty();
  }
  const flattenedPath = parsedPath.flatten().map(x => x.path);

  const flattenedPaths = parsedPaths.map(x => x.flatten().map(z => z.path));

  const result = flattenedPaths.reduce((prev: string[], current: string[]) => {
    return filter(prev, current);
  }, flattenedPath);

  return result.reduce<FlexiPath>(
    (prev: FlexiPath, current: string) => prev.append(current),
    flexi.empty()
  );
};

export const except = (path: Path, ...paths: Path[]): FlexiPath => {
  return flatReduce(
    (prev: string[], current: string[]) =>
      prev.filter(x => !current.includes(x)),
    path,
    ...paths
  );
};

export const intersect = (path: Path, ...paths: Path[]): FlexiPath => {
  return flatReduce(
    (prev: string[], current: string[]) =>
      prev.filter(x => current.includes(x)),
    path,
    ...paths
  );
};

/**
 *
 * @param path The `path` to concatinate
 * @param paths One or multiple `paths` to concatinate the `path` with
 */
export const concat = (path: Path, ...paths: Path[]): FlexiPath => {
  const initial = parse(path).path;

  const result = (paths || []).reduce<string>((prev: string, current: Path) => {
    return join(prev, parse(current).path);
  }, initial);

  return flexi.path(result);
};

/**
 * @param path The `path` to prepend
 * @param paths One or multiple `paths` to prepend the `path` with
 */
export const prepend = (path: Path, ...paths: Path[]): FlexiPath => {
  const allPaths = [...paths, path];

  if (allPaths.length > 1) {
    const [first, ...rest] = allPaths;
    return concat(first, ...rest);
  }

  return parse(path);
};

/**
 * @param path The first `path` to diff
 * @param other The first `path` to diff
 */
export const diff = (path: Path, other: Path): [FlexiPath, FlexiPath] => {
  return [
    diffPath(path, strategies.untilSameAs(parse(other))),
    diffPath(other, strategies.untilSameAs(parse(path)))
  ];
};

export const hasRoot = (path: Path) => parse(path).root === sep;

/**
 * Flattens a `path`
 * @param path The `path` to `flattern`
 * @returns An array with the flatterned `path`
 */
export const flatten = (path: Path): FlexiPath[] => {
  if (flexi.isEmpty(path)) {
    return [];
  }

  const result: FlexiPath[] = [];

  walker.walk(parse(path), (current: FlexiPath) => {
    result.unshift(flexi.path(current.isRoot() ? current.root : current.base));
    return current.parent().isEmpty();
  });

  return result;
};

export const reverse = (path: Path): FlexiPath => {
  const segments = flatten(path).reverse();

  if (segments.length < 2) {
    return parse(path);
  }

  const [first, ...rest] = segments;

  return first.append(...rest);
};

export const isEmpty = (path: Path | null): boolean =>
  path === null || parse(path).path === flexi.empty().path;

export const root = "/";

export const isValid = (path: Path): boolean => parse(path).root !== "";

export const isRoot = (path: Path) => parse(path).path === sep;

export const exists = (path: Path) => existsSync(parse(path).path);

export const stats = (path: Path): Stats | null =>
  (exists(path) && lstatSync(parse(path).path)) || null;

export const guessType = (path: Path): PathType => {
  const parsed = parse(path);
  if (!isValid(parsed)) {
    return PathType.Unknown;
  }
  const maybeFile =
    (parsed.ext !== "" || !parsed.path.endsWith(sep)) &&
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
    parse: () => parse(currentPath),
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

    hasRoot: () => hasRoot(currentPath),
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
    prepend: (...paths: Path[]) => prepend(currentPath, ...paths),
    /**
     * Get the diff for two paths
     * @param path The `path` to diff against
     */
    diff: (other: Path) => diff(currentPath, other),
    /**
     * Reverses the `path`
     */
    reverse: () => reverse(currentPath),
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
    write: () => write(currentPath),
    flatten: () => flatten(currentPath),
    /**
     * Cuts a path
     * @param count Number of levels to cut
     * @returns The cutted `path`
     */
    cut: (count: number) => cut(currentPath, count),

    /**
     * Intersects paths
     * @param paths The `paths` to `intersect` with
     * @returns The intersected part of the `path`
     */
    intersect: (...paths: Path[]) => intersect(currentPath, ...paths),

    /**
     * Excludes `paths`from a `path`
     * @param paths The `paths`to exclude
     * @returns The `path` except for the `paths` that intersects
     */
    except: (...paths: Path[]) => except(currentPath, ...paths)
  };
};

export default path;
