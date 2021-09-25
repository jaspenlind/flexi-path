import { FlexiPath } from "../../types";
import { flatReduce } from "./flatten";

/**
 * Excludes `paths`from a `path`
 * @category path
 * @param paths The `paths`to exclude
 * @returns The `path` except for the `paths` that intersects
 */
const except = (path: string, ...paths: string[]): FlexiPath =>
  flatReduce((prev: string[], current: string[]) => prev.filter((x) => !current.includes(x)), path, ...paths);

export default except;
