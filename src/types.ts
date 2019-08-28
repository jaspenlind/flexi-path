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
  (numberOfLevels: number): FlexiPath | null;
  (): FlexiPath | null;
  // TODO (predicate: (flex: FlexiPath) => boolean): FlexiPath;
}

export interface FlexiPath extends ParsedPath {
  path: string;
  isRoot(): boolean;
  exists(): boolean;
  type(): PathType;
  parent: ParentQuery;
  subDirectories: SubDirectoryQuery;
  files(): FlexiPath[];
}

export enum NavigationState {
  Default = 0,
  Found = 1,
  Resume = 2,
  Skip = 3,
  Abort = 4
}

export interface ResolveOptions {
  predicate: (current: ParsedPath) => boolean;
  onNavigate?(current: ParsedPath): NavigationState;
}

export * from "./flexiPath";
export * from "./subDirectories";
export * from "./files";
export * from "./parent";
export * from "./path";
export * from "./resolve";
