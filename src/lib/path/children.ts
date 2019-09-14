import { ChildQuery, FlexiPath, PathMeta } from "..";
import walker from "../walker";
import { concat, readDir } from ".";

/**
 * @ignore
 */
const getContent = (
  path: string,
  condition?: (current: FlexiPath) => boolean
): FlexiPath[] => {
  let content = readDir(path)
    .map(x => concat(path, x.name))
    .sort((first, second) => (first.path > second.path ? 0 : -1));

  if (condition) {
    content = content.filter(x => condition(x));
  }

  return content;
};

/**
 * Returns the subdirectories and files for a given `path`
 * @param path The current `path``
 * @category path
 */
const children = (path: string): ChildQuery => (
  condition?: any,
  options?: any
): FlexiPath[] => {
  const typedCondition = condition as (current: PathMeta) => boolean;
  const recursive = (options && options.recursive) || false;

  return recursive
    ? walker.forward(path, { until: typedCondition }).result
    : getContent(path, condition);
};

export default children;
