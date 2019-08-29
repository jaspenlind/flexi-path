import { Stats, existsSync, lstatSync, readdirSync, Dirent } from "fs";
import { PathType, FlexiPath } from ".";

const pathAsString = (path: string | FlexiPath): string => {
  return typeof path === "object" ? path.path : path;
};

export const root = "/";

export const isValid = (path: string | FlexiPath): boolean => {
  return pathAsString(path).startsWith(root);
};

export const isRoot = (path: string | FlexiPath) => pathAsString(path) === root;

export const exists = (path: string | FlexiPath) =>
  existsSync(pathAsString(path));

export const stats = (path: string | FlexiPath): Stats | null =>
  (exists(path) && lstatSync(pathAsString(path))) || null;

export const type = (path: string | FlexiPath): PathType => {
  const stat = stats(path);

  return (
    (stat && stat.isDirectory() && PathType.Directory) ||
    (stat && stat.isFile() && PathType.File) ||
    PathType.Unknown
  );
};

export const readDir = (path: string | FlexiPath): Dirent[] =>
  (exists(path) &&
    type(path) === PathType.Directory &&
    readdirSync(pathAsString(path), { withFileTypes: true })) ||
  [];

/**
 *
 * @param currentPath Path utility function
 */
export const path = (currentPath: string | FlexiPath) => {
  return {
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
