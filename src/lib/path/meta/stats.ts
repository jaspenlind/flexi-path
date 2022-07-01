import { lstatSync, Stats } from "fs";

import { exists } from ".";

/**
 * @ignore
 */
export const stats = (path: string): Stats | null => (exists(path) && lstatSync(path)) || null;
