import { FlexiPath } from "../../types";
import walker from "../walker";
import { depth } from "./meta";

/**
 * Cuts a path
 * @category path
 * @param count Number of levels to cut
 * @returns The cutted `path`
 */
export const cut = (path: string, count: number): FlexiPath => {
  const currentDepth = depth(path);
  const newDepth = currentDepth - count;

  return walker.back(path, { until: (x) => x.depth === newDepth }).result;
};
