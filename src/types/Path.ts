import { FlexiPath, PathMeta, PathWithBasePath } from ".";

/**
 * a `string`, `string[]` or a `FlexiPath` with or without a `baseBath` representing a file path or any arbitrary path
 * @category path
 */
export type Path = string | string[] | PathWithBasePath | PathMeta | FlexiPath;
