import { Path } from ".";

/**
 * A `path` with a `basePath`
 * @category path
 */
export interface PathWithBasePath {
  basePath: Path;
  path: Path;
}
