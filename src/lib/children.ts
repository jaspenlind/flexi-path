import { ChildQuery, FlexiPath, Path, PathMeta } from "..";
import { parse, readDir } from "./path";
import walker from "./walker";

/**
 * @ignore
 */
const getContent = (
  path: FlexiPath,
  condition?: (current: FlexiPath) => boolean
): FlexiPath[] => {
  let content = readDir(path)
    .map(x => path.append(x.name))
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
const children = (path: Path): ChildQuery => (
  condition?: any,
  options?: any
): FlexiPath[] => {
  const parsed = parse(path);

  const typedCondition = condition as (current: PathMeta) => boolean;
  const recursive = (options && options.recursive) || false;

  return recursive
    ? walker.walk(parsed, { until: typedCondition })
    : getContent(parsed, condition);
};

export default children;
