import { EventEmitter } from "events";
import type { BlockWithTransactions } from "@ethersproject/abstract-provider";
import type { CallbackWithOneParam } from "_/types/utils/callback.types";

const eventEmitter = new EventEmitter();

const eventService = {
  /**
   * PubSub for new ethereum block number updates
   */
  blockNumber: {
    sub: (cb: CallbackWithOneParam<number>) =>
      eventEmitter.on("block-number", cb),
    pub: (blockNumber: number) =>
      eventEmitter.emit("block-number", blockNumber),
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

export default eventService;
