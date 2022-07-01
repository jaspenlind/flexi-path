import { Flexi, Path } from "./types";
import path, { concat, empty, root } from "./lib/path";
import { exists, isEmpty, isRoot } from "./lib/path/meta";
import { pathString } from "./lib/path/parse";
import walker from "./lib/walker";
// import { sameAs } from "./lib/walker/until/sameAs";
// import { exists as untilExists } from "./lib/walker/until/exists";

export * from "./types";
export { until } from "./lib/walker/until";
// export const until = {
//   sameAs,
//   exists: untilExists
// };

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
