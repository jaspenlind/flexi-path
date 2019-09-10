import flexi, { FlexiPath, Path } from "..";
import walker from "./walker";

/**
 * Cuts a path
 * @category path
 * @param count Number of levels to cut
 * @returns The cutted `path`
 */
const cut = (path: Path, count: number): FlexiPath => {
  const { depth } = flexi.path(path);
  const newDepth = depth - count;

  return walker.walkBack(path, { until: x => x.depth === newDepth }).result;
};

export default cut;
