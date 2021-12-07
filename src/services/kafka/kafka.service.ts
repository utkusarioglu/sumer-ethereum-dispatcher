import { Kafka, Producer } from "kafkajs";
import { KAFKA_BROKERS, HOSTNAME } from "_/config";

/**
 * Handles kafka cluster communications
 */
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({ clientId, brokers });
    this.producer = this.kafka.producer({
      idempotent: true,
      maxInFlightRequests: 5,
      allowAutoTopicCreation: false,
    });
  }

  /**
   * Initiates producer connection
   * @returns void promise
   */
  async producerConnect() {
    return this.producer.connect();
  }

  /**
   * Sends block number from ethereum blockchain to the kafka cluster
   * @param blockNum block number from ethereum blockchain
   */
  async sendBlockNumber(blockNum: number) {
    this.producer.send({
      topic: "ethereum-block-number",
      acks: -1,
      messages: [
        {
          value: blockNum.toString(),
        },
      ],
    });
  }

  /**
   * Sends ethereum block content to kafka cluster
   * @param blockContent block content from ethereum blockchain
   */
  async sendBlockContent<T extends Object>(blockContent: T) {
    this.producer.send({
      topic: "ethereum-block-content",
      acks: -1,
      messages: [
        {
          value: JSON.stringify(blockContent),
        },
      ],
    });
  }
}

export default new KafkaService(HOSTNAME, KAFKA_BROKERS);
