import { join } from "path";
import { FlexiPath, path as pathHelper, parse, Path } from ".";

/**
 * The files in the current `path`
 */
export const files = (path: Path): FlexiPath[] =>
  pathHelper(path)
    .readDir()
    .filter(x => x.isFile())
    .map(x => parse(join(parse(path).path, x.name)));

export default files;
