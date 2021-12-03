import { ethers } from "ethers";
import { INFURA_API_KEY, NETWORK } from "_/config";

export class EthereumService {
  private provider: ethers.providers.Provider;

  constructor() {
    this.provider = new ethers.providers.InfuraProvider(
      NETWORK,
      INFURA_API_KEY
    );
  }

  public listen() {
    this.provider.on("block", async (blockNumber) => {
      const blockTx = await this.provider.getBlockWithTransactions(blockNumber);
      console.log(blockTx);
    });
  }
}

export default new EthereumService();
