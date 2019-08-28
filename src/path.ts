import { Stats, existsSync, lstatSync, readdirSync, Dirent } from "fs";
import { PathType, FlexiPath } from ".";

export const isRoot = (path: string) =>
  ["./", "/"].find(x => x === path) !== undefined;

export const exists = (path: string) => existsSync(path);

export const stats = (path: string): Stats | null =>
  (exists(path) && lstatSync(path)) || null;

export const type = (path: string): PathType => {
  const stat = stats(path);

  return (
    (stat && stat.isDirectory() && PathType.Directory) ||
    (stat && stat.isFile() && PathType.File) ||
    PathType.Unknown
  );
};

export const readdir = (path: string): Dirent[] =>
  (exists(path) &&
    type(path) === PathType.Directory &&
    readdirSync(path, { withFileTypes: true })) ||
  [];

export const path = (currentPath: string | FlexiPath) => {
  const currentPathAsString =
    typeof currentPath === "object" ? currentPath.path : currentPath;

  return {
    isRoot: () => isRoot(currentPathAsString),
    exists: () => exists(currentPathAsString),
    stats: () => stats(currentPathAsString),
    type: () => type(currentPathAsString),
    readdir: () => readdir(currentPathAsString)
  };
};

export default path;
