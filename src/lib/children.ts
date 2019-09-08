import flexi, { ChildQuery, FlexiPath, Path } from "..";
import { parse, readDir } from "./path";

const getContent = (
  path: FlexiPath,
  condition?: (current: FlexiPath) => boolean
): FlexiPath[] => {
  let content = readDir(path).map(x => path.append(x.name));

  if (condition) {
    content = content.filter(x => condition(x));
  }

  return content;
};

const walk = (
  path: FlexiPath,
  condition: (current: FlexiPath) => boolean,
  ...acc: FlexiPath[]
): FlexiPath[] => {
  // TODO
  return getContent(path, condition);
};

const children = (path: Path): ChildQuery => (
  condition?: any,
  options?: any
): FlexiPath[] => {
  const parsed = parse(path);

  const typedCondition = condition as (current: FlexiPath) => boolean;
  const recursive = (options && options.recursive) || false;

  return recursive
    ? walk(parsed, typedCondition)
    : getContent(parsed, condition);
};

export default children;
