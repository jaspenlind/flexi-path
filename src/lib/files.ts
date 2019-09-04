import { join } from "path";
import { FlexiPath, Path } from "..";
import pathHelper, { parse } from "./path";
/**
 * The files in the current `path`
 */
export const files = (path: Path): FlexiPath[] =>
  pathHelper(path)
    .readDir()
    .filter(x => x.isFile())
    .map(x => parse(join(parse(path).path, x.name)));

export default files;
