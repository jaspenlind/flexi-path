import { PathMeta, WalkedState } from ".";

/**
 * @category walker
 */
export type Walking = (current: { path: PathMeta; state: WalkedState }) => void;
