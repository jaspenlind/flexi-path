import { constants } from "..";

/**
 * @category path
 */
export const depth = (path: string): number => {
  const levels = path.split(constants.sep);
  if (path.endsWith(constants.sep)) {
    levels.pop();
  }

  return levels.length - 1;
};
