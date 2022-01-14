#!/bin/sh

yarn ts-node-dev \
  -r tsconfig-paths/register \
  -r ./src/tracing.ts \
  src/index.ts
