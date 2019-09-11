import until from "./until";
import walk from "./walk";
import walkBack from "./walkBack";

export { default as reporter, WalkedState, WalkOptions } from "./reporter";

/**
 * @category walker
 */
const walker = {
  walk,
  walkBack,
  until
};

export default walker;
