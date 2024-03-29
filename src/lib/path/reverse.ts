import { FlexiPath } from "../../types";
import { flatten, parse } from ".";

/**
 * Reverses the `path`
 * @category path
 */
export const reverse = (path: string): FlexiPath => {
  const segments = flatten(path).reverse();

  if (segments.length < 2) {
    return parse(path);
  }

  const [first, ...rest] = segments;

  return first.append(...rest);
};
