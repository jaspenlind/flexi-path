import { FlexiPath } from "..";
import depth from "./depth";
import walker from "./walker";

/**
 * Cuts a path
 * @category path
 * @param count Number of levels to cut
 * @returns The cutted `path`
 */
const cut = (path: string, count: number): FlexiPath => {
  const currentDepth = depth(path);
  const newDepth = currentDepth - count;

  return walker.walkBack(path, { until: x => x.depth === newDepth }).result;
};

export default cut;
