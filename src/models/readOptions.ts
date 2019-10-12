import { ReadOptions, TextTransform } from "../types";

export { ReadOptions, TextTransform };

export const initial: ReadOptions = {
  encoding: "utf8",
  transform: TextTransform.Plain
};

export const create = (fields?: Partial<ReadOptions>): ReadOptions => ({
  ...initial,
  ...fields
});
