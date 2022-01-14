import ethereumService from "_services/ethereum/ethereum.service";
import eventsService from "_/services/events/events.service";
import kafkaService from "_services/kafka/kafka.service";
import loggerService from "_services/logger/logger.service";
import { ProbeService } from "_services/probe/probe.service";
import * as ALL_CONFIG from "_/__config";

loggerService.debug(
  [
    "Using config:",
    ...Object.entries(ALL_CONFIG).map(([key, value]) => `  ${key}: ${value}`),
  ].join("\n")
);

const probeService = new ProbeService(loggerService);
probeService.listen();

kafkaService.connect().then(() => {
  loggerService.info("Connected to Kafka");

  eventsService.blockNumber.sub((d) => kafkaService.sendBlockNumber(d));
  eventsService.blockContent.sub((d) => kafkaService.sendBlockContent(d));

  ethereumService.listen({
    blockNum: eventsService.blockNumber.pub,
    blockContent: eventsService.blockContent.pub,
  });
});
