import { EventEmitter } from "events";
import type { BlockWithTransactions } from "@ethersproject/abstract-provider";
import type { CallbackWithOneParam } from "_/types/utils/callback.types";

const eventEmitter = new EventEmitter();

const eventEmitterService = {
  /**
   * PubSub for new ethereum block number updates
   */
  blockNum: {
    sub: (cb: CallbackWithOneParam<number>) => eventEmitter.on("block-num", cb),
    pub: (blockNum: number) => eventEmitter.emit("block-num", blockNum),
  },

  /**
   * PubSub for new ethereum block content events
   */
  blockContent: {
    pub: (blockContent: BlockWithTransactions) =>
      eventEmitter.emit("block-content", blockContent),
    sub: (cb: CallbackWithOneParam<BlockWithTransactions>) =>
      eventEmitter.on("block-content", cb),
  },
};

export default eventEmitterService;
