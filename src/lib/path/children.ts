import { ChildQuery, FlexiPath, PathMeta } from "../../types";
import walker from "../walker";
import { concat, readDir } from ".";

/**
 * @ignore
 */
const getContent = (path: string, condition?: (current: FlexiPath) => boolean): FlexiPath[] => {
  let content = readDir(path)
    .map(x => concat(path, x.name))
    .sort();

  if (condition) {
    content = content.filter(x => condition(x));
  }

  return content;
};

/**
 * Returns the subdirectories and files for a given `path`
 * @param path The current `path`
 * @category path
 */
const children = (path: string): ChildQuery => (
  condition?: (current: PathMeta) => boolean,
  options?: { recursive?: boolean }
): FlexiPath[] => {
  const recursive = (options && options.recursive) || false;

  return recursive ? walker.forward(path, { until: condition }).result : getContent(path, condition);
};

export default children;
