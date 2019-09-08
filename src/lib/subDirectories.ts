import { FlexiPath, Path, PathType, SubDirectoryQuery } from "..";
import children from "./children";

/**
 * The sub directories of the `path` and a `path` builder
 * @category path
 * @param path The current `path`
 */
const subDirectories = (path: Path): SubDirectoryQuery => (
  condition?: any,
  options?: any
): FlexiPath[] =>
  children(path)(condition, options).filter(
    x => x.type() === PathType.Directory
  );

export default subDirectories;
