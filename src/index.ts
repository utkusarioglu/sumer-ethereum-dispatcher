import ethereumService from "_services/ethereum/ethereum.service";
import eventsService from "_/services/events/events.service";
import kafkaService from "_services/kafka/kafka.service";
import loggerService from "_/services/logger/logger.service";
import http from "http";
import * as ALL_CONFIG from "_/__config"
import { PORT } from "_/__config";

loggerService.debug(["Using config:",
  ...Object.entries(ALL_CONFIG).map(([key, value]) => `  ${key}: ${value}`)
].join("\n"))

kafkaService.connect().then(() => {
  loggerService.info("Connected to Kafka");

  eventsService.blockNumber.sub((d) => kafkaService.sendBlockNumber(d));
  eventsService.blockContent.sub((d) => kafkaService.sendBlockContent(d));

  ethereumService.listen({
    blockNum: eventsService.blockNumber.pub,
    blockContent: eventsService.blockContent.pub,
  });
});

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("OK");
});

server.listen(PORT, () => loggerService.info(`Running on ${PORT}`));
