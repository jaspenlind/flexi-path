import { Stats, existsSync, lstatSync, readdirSync, Dirent } from "fs";
import { PathType, FlexiPath } from ".";

const pathAsString = (path: string | FlexiPath): string => {
  return typeof path === "object" ? path.path : path;
};

export const isRoot = (path: string | FlexiPath) =>
  ["./", "/"].find(x => x === pathAsString(path)) !== undefined;

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

export const path = (currentPath: string | FlexiPath) => {
  return {
    isRoot: () => isRoot(currentPath),
    exists: () => exists(currentPath),
    stats: () => stats(currentPath),
    type: () => type(currentPath),
    readDir: () => readDir(currentPath)
  };
};

export default path;
