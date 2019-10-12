import { WriteOptions } from "../types";

export { WriteOptions };

/** @category path */
export const initial: WriteOptions = {
  encoding: "utf8",
  overwrite: false
};

/** @category path */
export const create = (fields?: Partial<WriteOptions>): WriteOptions => ({
  ...initial,
  ...fields
});
