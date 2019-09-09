import { ChildQuery, FlexiPath, Path } from "..";
import { parse, readDir } from "./path";
import walker from "./walker";

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

const children = (path: Path): ChildQuery => (
  condition?: any,
  options?: any
): FlexiPath[] => {
  const parsed = parse(path);

  const typedCondition = condition as (current: FlexiPath) => boolean;
  const recursive = (options && options.recursive) || false;

  return recursive
    ? walker.walk(parsed, typedCondition)
    : getContent(parsed, condition);
};

export default children;
