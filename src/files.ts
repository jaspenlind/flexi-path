import { join } from "path";
import flexi, { FlexiPath, path as pathHelper } from ".";

export const files = (path: string): FlexiPath[] =>
  pathHelper(path)
    .readDir()
    .filter(x => x.isFile())
    .map(x => flexi.path(join(path, x.name)));

export default files;
