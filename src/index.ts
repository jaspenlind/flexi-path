import { parse, ParsedPath, join } from "path";
import { existsSync } from "fs";

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
  const type = () => PathType.Unknown;
  const parentPath = (): string => join(path, up);
  const parent = (): FlexiPath | null =>
    (!isRoot() && FlexiPath(parentPath())) || null;
  const subDirectories = (): FlexiPath[] => [];
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

export default FlexiPath;
