import { FlexiPath } from "../../types";
import { flatReduce } from "./flatten";

/**
 * Intersects paths
 * @category path
 * @param paths The `paths` to `intersect` with
 * @returns The intersected part of the `path`
 */
export const intersect = (path: string, ...paths: string[]): FlexiPath =>
  flatReduce((prev: string[], current: string[]) => prev.filter((x) => current.includes(x)), path, ...paths);
