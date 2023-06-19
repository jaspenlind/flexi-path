import { Flexi, Path } from "./types";
import path, { concat, empty, root } from "./lib/path";
import { exists, isEmpty, isRoot } from "./lib/path/meta";
import { pathString } from "./lib/path/parse";
import walker from "./lib/walker";

export * from "./types";
export { until } from "./lib/walker/until";

/** @category path */
export const flexi: Flexi = {
  concat: (current: Path, ...paths: Path[]) => concat(pathString(current), ...paths.map((x) => pathString(x))),
  empty: () => empty(),
  exists: (current: Path) => exists(current),
  isEmpty: (current: Path | null) => isEmpty(current),
  isRoot: (current: Path) => isRoot(current),
  path: (current: Path) => path(current),
  pathString: (current: Path) => pathString(current),
  root: () => root(),
  walk: walker
};

export default flexi;
