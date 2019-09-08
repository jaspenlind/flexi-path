import { FileQuery, FlexiPath, Path, PathType } from "..";
import children from "./children";

/**
 * The files in the current `path`
 * @category path
 */
const files = (path: Path): FileQuery => (
  condition?: any,
  options?: any
): FlexiPath[] =>
  children(path)(condition, options).filter(x => x.type() === PathType.File);

export default files;
