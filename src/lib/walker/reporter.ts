import { Path, WalkedState, WalkOptions } from "../..";
import parse from "../parse";

export { WalkedState, WalkOptions } from "../..";

const report = (
  path: Path,
  options?: WalkOptions,
  state?: WalkedState
): WalkedState => {
  const reporter = options && options.onWalk;
  const currentState = state || WalkedState.Default;

  return (
    (reporter && reporter({ path: parse(path), state: currentState })) ||
    currentState
  );
};

const reporter = (options?: WalkOptions) => {
  return {
    report: (path: Path, state?: WalkedState) => report(path, options, state)
  };
};

export default reporter;
