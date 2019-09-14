import { concat } from ".";

/** @category path */
const append = (path: string, ...paths: string[]) => concat(path, ...paths);

export default append;
