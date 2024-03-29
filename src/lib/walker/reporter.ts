import { Path, WalkedState, WalkOptions } from "../../types";
import { parse } from "../path";

/**
 * Reports each stage in a walked path
 * @param path The currenly walked stage
 * @param options Options
 * @param state The current state
 * @category walker
 */
const report = (path: Path, options?: WalkOptions, state?: WalkedState): WalkedState => {
  const reporter = options?.onWalk;
  const currentState = state || WalkedState.Default;

  return (reporter && reporter({ path: parse(path), state: currentState })) || currentState;
};

/**
 * @category walker
 */
// const reporter = (options?: WalkOptions): Reporter => {
//   return {
//     report: (path: Path, state?: WalkedState) => report(path, options, state)
//   };
// };
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reporter = (options?: WalkOptions) => ({
  report: (path: Path, state?: WalkedState) => report(path, options, state)
});
export default reporter;
