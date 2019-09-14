import { ChildQuery, FlexiPath, PathMeta } from "../types";
import concat from "./concat";
import { readDir } from "./meta";
import parse from "./parse";
import walker from "./walker";

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
    ? walker.walk(path, { until: typedCondition })
    : getContent(path, condition);
};

export default children;
