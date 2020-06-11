import { concat } from ".";
import { FlexiPath } from "../../types";

/** @category path */
const append = (path: string, ...paths: string[]): FlexiPath => concat(path, ...paths);

export default append;
