import { ParsedPath } from "path";

export enum PathType {
  Unknown = 0,
  Directory = 1,
  File = 2
}

export interface SubDirectoryQuery {
  (name: string): FlexiPath;
  (): FlexiPath[];
  // TODO (predicate: (flex: FlexiPath) => boolean): FlexiPath[];
}

export interface ParentQuery {
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

export default { PathType };
