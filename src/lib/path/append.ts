import { concat } from ".";
import { FlexiPath } from "../../types";

/** @category path */
export const append = (path: string, ...paths: string[]): FlexiPath => concat(path, ...paths);
