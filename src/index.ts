import { parse, ParsedPath, join } from "path";
import { existsSync, lstatSync, Stats, readdirSync, Dirent } from "fs";

export enum PathType {
  Unknown = 0,
  Directory = 1,
  File = 2
}

interface SubDirectoryQuery {
  (name: string): FlexiPath;
  (): FlexiPath[];
  // TODO (predicate: (flex: FlexiPath) => boolean): FlexiPath[];
}

interface ParentQuery {
  (numberOfLevels: number): FlexiPath;
  (): FlexiPath;
  // TODO (predicate: (flex: FlexiPath) => boolean): FlexiPath;
}

export interface FlexiPath extends ParsedPath {
  path: string;
  isRoot(): boolean;
  exists(): boolean;
  type(): PathType;
  parent: ParentQuery; // FlexiPath | null;
  subDirectories: SubDirectoryQuery;
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
  const parent: ParentQuery = (numberOfLevels?: any): any => {
    if (isRoot()) {
      return null;
    }

    const levelsToNavigate = ((numberOfLevels as number) || 1) - 1;

    let current = FlexiPath(parentPath());

    // eslint-disable-next-line
    for (let i = 0; i < levelsToNavigate; i++) {
      current = current.parent();
      if (current === null || current.isRoot()) {
        break;
      }
    }
    return current;
  };

  const subDirectories: SubDirectoryQuery = (directoryName?: any): any => {
    if (directoryName === undefined) {
      return readdir()
        .filter(x => x.isDirectory())
        .map(x => FlexiPath(join(path, x.name)));
    }

    return FlexiPath(join(path, directoryName));
  };

  const files = (): FlexiPath[] =>
    readdir()
      .filter(x => x.isFile())
      .map(x => FlexiPath(join(path, x.name)));

  const api: FlexiPath = {
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

  return api;
};

export const Root = () => FlexiPath("/");

export default FlexiPath;
