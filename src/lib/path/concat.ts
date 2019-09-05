import { join } from "path";
import flexi, { Path, FlexiPath } from "../..";
import { parse } from ".";
/**
 * Concatinates a `path` with other `paths`
 * @category path
 * @param path The `path` to concatinate
 * @param paths One or multiple `paths` to concatinate the `path` with
 */
const concat = (path: Path, ...paths: Path[]): FlexiPath => {
  const initial = parse(path).path;

  const result = (paths || []).reduce<string>((prev: string, current: Path) => {
    return join(prev, parse(current).path);
  }, initial);

  return flexi.path(result);
};

export default concat;
