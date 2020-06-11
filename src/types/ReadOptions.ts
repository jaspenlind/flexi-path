import { TextTransform } from ".";
import { BaseEncodingOptions } from "fs";

/** @category path */
export interface ReadOptions {
  encoding: BufferEncoding;
  transform: TextTransform;
}
