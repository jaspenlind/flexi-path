import { join } from "path";

import { FlexiPath, Path } from "..";
import { parse, readDir } from "./path";

/**
 * The files in the current `path`
 * @category path
 */
const files = (path: Path): FlexiPath[] =>
  readDir(path)
    .filter(x => x.isFile())
    .map(x => parse(join(parse(path).path, x.name)));

export default files;
