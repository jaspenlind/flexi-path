import { ReadOptions, TextTransform } from "../types";

export { ReadOptions, TextTransform };

/** @category path */
export const initial: ReadOptions = {
  encoding: "utf8",
  transform: TextTransform.Plain
};

/** @category path */
export const create = (fields?: Partial<ReadOptions>): ReadOptions => ({
  ...initial,
  ...fields
});
