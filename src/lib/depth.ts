import { constants } from "./meta";

/**
 * @category path
 */
const depth = (path: string) => {
  const levels = path.split(constants.sep);
  if (path.endsWith(constants.sep)) {
    levels.pop();
  }

  return levels.length - 1;
};

export default depth;
