import { FileQuery, FlexiPath, PathType } from "../../types";
import { children } from ".";
/**
 * The files in the current `path`
 * @category path
 */
const files = (path: string): FileQuery => (
  condition?: any,
  options?: any
): FlexiPath[] =>
  children(path)(condition, options).filter(x => x.type() === PathType.File);

export default files;