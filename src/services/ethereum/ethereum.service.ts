import { ethers } from "ethers";
import { INFURA_API_KEY, NETWORK } from "_/__config";
import type { ListenParams } from "./ethereum.service.types";
import metricsService from "_services/metrics/metrics.service";
import loggerService from "../logger/logger.service";

/**
 * Provides ethereum blockchain related services
 * It mainly works as a facade.
 */
export class EthereumService {
  private provider: ethers.providers.Provider;

  constructor() {
    this.provider = new ethers.providers.InfuraProvider(
      NETWORK,
      INFURA_API_KEY
    );
  }

  /**
   * Listens to ethereum events
   * @param param0 see ListenParams type for details
   */
  public listen({ blockNum, blockContent }: ListenParams) {
    this.provider.on("block", async (blockNumber) => {
      loggerService.debug(`Receive new block: ${blockNumber}`);
      metricsService.incrementBlock();
      blockNum(blockNumber);
      try {
        const blockTx = await this.provider.getBlockWithTransactions(
          blockNumber
        );
        loggerService.debug(
          `Receive ${blockTx.transactions.length} transactions for block ${blockNumber}`
        );
        metricsService.incrementTransaction(blockTx.transactions.length);
        blockContent(blockTx);
      } catch (e) {
        loggerService.error(
          `Failed to retrieve transactions for block ${blockNumber}`
        );
      }
    });
  }
}

export default new EthereumService();
