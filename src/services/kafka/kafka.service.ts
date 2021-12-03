import { Admin, Kafka, Producer } from "kafkajs";
import { KAFKA_BROKERS, HOSTNAME } from "_/config";

export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({ clientId, brokers });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  async producerConnect() {
    return this.producer.connect();
  }

  async sendBlockNumber(blockNum: number) {
    this.producer.send({
      topic: "block-number",
      messages: [
        {
          value: blockNum.toString(),
        },
      ],
    });
  }

  async sendBlockContent<T extends Object>(blockContent: T) {
    this.producer.send({
      topic: "block-content",
      messages: [
        {
          value: JSON.stringify(blockContent, null, 2),
        },
      ],
    });
  }

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
