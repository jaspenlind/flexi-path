import { FlexiPath, Path } from "..";
import parse from "./parse";
import { flatten } from "./path";
/**
 * Reverses the `path`
 * @category path
 */
const reverse = (path: Path): FlexiPath => {
  const segments = flatten(path).reverse();

  if (segments.length < 2) {
    return parse(path);
  }

  const [first, ...rest] = segments;

  return first.append(...rest);
};

export default reverse;
