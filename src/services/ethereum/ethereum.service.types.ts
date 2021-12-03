import type { BlockWithTransactions } from "@ethersproject/abstract-provider";
import type { CallbackWithOneParam } from "_/types/utils/callback.types";

/**
 * Params of the listen method
 * @param blockNum callback for retrieving the latest eth block number
 * @param blockContent callback for retrieving the latest eth block content
 */
export type ListenParams = {
  blockNum: CallbackWithOneParam<number>;
  blockContent: CallbackWithOneParam<BlockWithTransactions>;
};
