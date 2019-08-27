import { parse, ParsedPath, join } from "path";
import { existsSync, lstatSync, Stats, readdirSync, Dirent } from "fs";

export enum PathType {
  Unknown = 0,
  Directory = 1,
  File = 2
}

export interface FlexiPath extends ParsedPath {
  path: string;
  isRoot(): boolean;
  exists(): boolean;
  type(): PathType;
  parent(): FlexiPath | null;
  subDirectories(): FlexiPath[];
  files(): FlexiPath[];
}

export const FlexiPath = (path: string): FlexiPath => {
  const up = "../";
  const { root, dir, ext, base, name } = parse(path);
  const isRoot = () => ["./", "/"].find(x => x === path) !== undefined;
  const exists = () => existsSync(path);
  const stats = (): Stats | null => (exists() && lstatSync(path)) || null;
  const type = (): PathType => {
    const stat = stats();

    return (
      (stat && stat.isDirectory() && PathType.Directory) ||
      (stat && stat.isFile() && PathType.File) ||
      PathType.Unknown
    );
  };

  const readdir = (): Dirent[] =>
    (exists() &&
      type() === PathType.Directory &&
      readdirSync(path, { withFileTypes: true })) ||
    [];

  const parentPath = (): string => join(path, up);
  const parent = (): FlexiPath | null =>
    (!isRoot() && FlexiPath(parentPath())) || null;
  const subDirectories = (): FlexiPath[] =>
    readdir()
      .filter(x => x.isDirectory())
      .map(x => FlexiPath(join(path, x.name)));

  const files = (): FlexiPath[] => [];

  return {
    root,
    dir,
    ext,
    base,
    name,
    path,
    isRoot,
    exists,
    type,
    parent,
    subDirectories,
    files
  };
};

export const Root = () => FlexiPath("/");

export default FlexiPath;
