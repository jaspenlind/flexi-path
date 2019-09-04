import { join } from "path";
import flexi, { FlexiPath, ParentQuery, Path } from "..";
import strategies from "./resolve/strategies";
import { parse } from "./path";

export const up = "../";
export const parentPath = (path: Path): Path => {
  const pathAsString = parse(path).path;
  const joinedPath = join(pathAsString, up);

  return joinedPath === "./" ? flexi.empty() : parse(joinedPath);
};

/**
 * The `parent` directory of the `path`
 */
export const parent = (path: Path): ParentQuery => (query?: any): FlexiPath => {
  const parsed = parse(path);
  if (parsed.isEmpty() || parsed.isRoot()) {
    return flexi.empty();
  }

  if (typeof query === "function") {
    const until = query as (current: FlexiPath) => boolean;

    return flexi.resolve(parsed, strategies.parentUntil(until));
  }

  const levelsToNavigate = ((query as number) || 1) - 1;

  let next = parentPath(parsed);

  if (levelsToNavigate > 0 && next !== flexi.empty()) {
    next = parent(next)(levelsToNavigate);
  }

  return (next && parse(next)) || flexi.empty();
};

export default parent;
