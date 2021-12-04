import { Admin, Kafka, Producer } from "kafkajs";
import { KAFKA_BROKERS, HOSTNAME } from "_/config";

/**
 * Handles kafka cluster communications
 */
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({ clientId, brokers });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
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
      messages: [
        {
          value: JSON.stringify(blockContent, null, 2),
        },
      ],
    });
  }

  /**
   * Creates relevant topics in kafka cluster.
   * @warning
   * Note that this shall only be called in the development environment.
   * Production topics shall be controlled by kafka/strimzi only.
   */
  createTopics() {
    this.admin.createTopics({
      waitForLeaders: true,
      topics: [
        {
          topic: "block-number",
          numPartitions: 1,
        },
        {
          topic: "block-content",
          numPartitions: 1,
        },
      ],
    });
  }
}
export default new KafkaService(HOSTNAME, KAFKA_BROKERS);
