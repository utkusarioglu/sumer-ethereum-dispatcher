import ethereumService from "_services/ethereum/ethereum.service";
import eeService from "_services/event-emitter/event-emitter.service";
import kafkaService from "_services/kafka/kafka.service";
import { NODE_ENV } from "_/config";

NODE_ENV === "development" && kafkaService.createTopics();

kafkaService.producerConnect().then(() => {
  console.log("producer connected");

  eeService.blockNumber.sub((d) => kafkaService.sendBlockNumber(d));
  eeService.blockContent.sub((d) => kafkaService.sendBlockContent(d));

  ethereumService.listen({
    blockNum: eeService.blockNumber.pub,
    blockContent: eeService.blockContent.pub,
  });
});
