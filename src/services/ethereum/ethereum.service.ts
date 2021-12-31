import { ethers } from "ethers";
import { INFURA_API_KEY, NETWORK } from "_/__config";
import type { ListenParams } from "./ethereum.service.types";

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
      blockNum(blockNumber);
      const blockTx = await this.provider.getBlockWithTransactions(blockNumber);
      blockContent(blockTx);
    });
  }
}

export default new EthereumService();
