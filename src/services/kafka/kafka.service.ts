import { Kafka, Producer, Message } from "kafkajs";
import { KAFKA_BROKERS, HOSTNAME } from "_/config";
import loggerService from "_/services/logger/logger.service";
import { loggingServiceAdapter, kafkaLogLevelAdapter } from "./kafka.logger";

/**
 * Handles kafka cluster communications
 */
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({
      clientId,
      brokers,
      logLevel: kafkaLogLevelAdapter(),
      logCreator: loggingServiceAdapter,
    });
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
    return this.producer.connect().catch(loggerService.error);
  }

  /**
   * Sends block number from ethereum blockchain to the kafka cluster
   * @param blockNum block number from ethereum blockchain
   */
  async sendBlockNumber(blockNum: number) {
    const topic = "ethereum-block-number";
    const messages = [
      {
        value: blockNum.toString(),
      },
    ];
    return this.send(topic, messages);
  }

  /**
   * Sends ethereum block content to kafka cluster
   * @param blockContent block content from ethereum blockchain
   */
  async sendBlockContent<T extends Object>(blockContent: T) {
    const topic = "ethereum-block-content";
    const messages = [
      {
        value: JSON.stringify(blockContent),
      },
    ];
    return this.send(topic, messages);
  }

  /**
   * Wrapper for kafka send. With error catcher and logger
   * @param topic topic to send to
   * @param messages messages to send
   */
  private async send(topic: string, messages: Message[]) {
    this.producer
      .send({
        topic,
        acks: -1,
        messages,
      })
      .then(() => this.sendLog(topic, messages))
      .catch(loggerService.error);
  }

  /**
   * Logs the send operation using the loggerService
   * @param topic kafka topic
   * @param messages sent kafka messages
   */
  private sendLog(topic: string, messages: Message[]): void {
    const stringifiedMessages = JSON.stringify(messages);
    const maxLength = 50;
    const conciseMessages =
      stringifiedMessages.length > maxLength
        ? `${stringifiedMessages.slice(0, maxLength - 3)}...`
        : stringifiedMessages;
    loggerService.debug(`Sent "${conciseMessages}" to "${topic}"`, {
      section: "kafka",
    });
  }
}

export default new KafkaService(HOSTNAME, KAFKA_BROKERS);
