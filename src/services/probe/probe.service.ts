import { PORT } from "_/__config";
import http from "http";
import type loggerService from "_services/logger/logger.service";

export class ProbeService {
  private logger: typeof loggerService;
  private server = http.createServer((_req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("OK");
  });

  constructor(logger: typeof loggerService) {
    this.logger = logger;
  }

  /**
   * Starts the server for kube probes
   */
  listen() {
    this.server.listen(PORT, () =>
      this.logger.info(`Probe service running on ${PORT}`)
    );
  }
}
