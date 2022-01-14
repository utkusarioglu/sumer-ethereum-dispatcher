import { MeterProvider } from "@opentelemetry/sdk-metrics-base";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { PROMETHEUS_ENDPOINT, PROMETHEUS_PORT, NODE_ENV } from "_/__config";
import loggerService from "_services/logger/logger.service";

export class MetricsService {
  public labels = { pid: process.pid.toString(), environment: NODE_ENV };

  private meter = new MeterProvider({
    exporter: new PrometheusExporter({ port: PROMETHEUS_PORT }, () =>
      loggerService.info(
        `Prometheus metrics @ <kubernetes-url>:${PROMETHEUS_PORT}${PROMETHEUS_ENDPOINT}`
      )
    ),
    interval: 1000,
  }).getMeter("ethereum-dispatcher");

  private blockMeter = this.meter.createCounter("ethereum_blocks", {
    description: "Ethereum goerli blocks",
  });

  private transactionMeter = this.meter.createCounter("ethereum_transactions", {
    description: "Ethereum goerli transactions",
  });

  /**
   * Meters the number of blocks that have been mined since the start of the app
   */
  public incrementBlock() {
    this.blockMeter.add(1, this.labels);
  }

  /**
   * Meters the number of transactions that have been mined since the start of
   * the app.
   */
  public incrementTransaction(transactionCount: number) {
    this.transactionMeter.add(transactionCount, this.labels);
  }
}

export default new MetricsService();
