import { FlexiPath, WalkedPath } from "../types";

export const empty: WalkedPath<FlexiPath[]> = { diff: [], result: [] };

export const create = (path: Partial<WalkedPath<FlexiPath[]>>): WalkedPath<FlexiPath[]> => ({
  ...empty,
  ...path
});

export const walkedPath = {
  create,
  empty
};
