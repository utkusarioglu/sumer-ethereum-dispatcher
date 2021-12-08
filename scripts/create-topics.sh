#!/bin/sh

create_topic() {
  if [ -z "$(which docker)" ]; then
    echo "This script needs docker access" && exit 1
  fi

  if [ -z "$1" ]; then
    echo "param 1 needs to be the topic name" && exit 1
  fi
  TOPIC_NAME = $1
  CONTAINER_NAME=ethereum-dispatcher_kafka_1

  docker exec -it $CONTAINER_NAME bash -c \
    "/opt/bitnami/kafka/bin/kafka-topics.sh \
      --bootstrap-server kafka:9092 \
      --topic $TOPIC_NAME \
      --replication-factor 1 \
      --partitions 1 \
      --create"

}

create_topic "ethereum-block-content"
create_topic "ethereum-block-number"
