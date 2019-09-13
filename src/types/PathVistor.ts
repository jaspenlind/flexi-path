import { Path } from ".";

/**
 * Path visitor
 * @category path
 */
export interface PathVistor<T> {
  visit(path: Path): T;
}
