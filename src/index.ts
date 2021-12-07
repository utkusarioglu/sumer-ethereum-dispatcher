import ethereumService from "_services/ethereum/ethereum.service";
import eeService from "_services/event-emitter/event-emitter.service";
import kafkaService from "_services/kafka/kafka.service";
import http from "http";

kafkaService.producerConnect().then(() => {
  console.log("ethereum-dispatcher connected to kafka");

  eeService.blockNumber.sub((d) => kafkaService.sendBlockNumber(d));
  eeService.blockContent.sub((d) => kafkaService.sendBlockContent(d));

  ethereumService.listen({
    blockNum: eeService.blockNumber.pub,
    blockContent: eeService.blockContent.pub,
  });
});

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("OK");
});

server.listen(80, () => console.log("ethereum-dispatcher listening on 80"));
