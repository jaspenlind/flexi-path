import { lstatSync, Stats } from "fs";

import { exists } from ".";

/**
 * @ignore
 */
const stats = (path: string): Stats | null => (exists(path) && lstatSync(path)) || null;

export default stats;
