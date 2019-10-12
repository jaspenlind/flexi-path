import { WriteOptions } from "../types";

export { WriteOptions };

export const initial: WriteOptions = {
  encoding: "utf8",
  overwrite: false
};

export const create = (fields?: Partial<WriteOptions>): WriteOptions => ({
  ...initial,
  ...fields
});
