import { FlexiPath, PathMeta, PathType, SubDirectoryQuery } from "../../types";
import { children } from ".";

/**
 * The sub directories of the `path` and a `path` builder
 * @category path
 * @param path The current `path`
 */
export const subDirectories =
  (path: string): SubDirectoryQuery =>
  (condition?: (current: PathMeta) => boolean, options?: { recursive?: boolean }): FlexiPath[] =>
    children(path)(condition, options).filter((x: any) => x.type() === PathType.Directory);
