import { FileQuery, FlexiPath, PathMeta, PathType } from "../../types";
import { children } from ".";
/**
 * The files in the current `path`
 * @category path
 */
export const files =
  (path: string): FileQuery =>
  (condition?: (current: PathMeta) => boolean, options?: { recursive?: boolean }): FlexiPath[] =>
    children(path)(condition, options).filter((x: any) => x.type() === PathType.File);
