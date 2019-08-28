import { join } from "path";
import flexi, { FlexiPath } from ".";

import pathHelper from "./path";

export const files = (path: string): FlexiPath[] =>
  pathHelper(path)
    .readdir()
    .filter(x => x.isFile())
    .map(x => flexi.path(join(path, x.name)));

export default files;
