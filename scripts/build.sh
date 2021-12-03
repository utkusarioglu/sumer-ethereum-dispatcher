#!/bin/sh

# This script creates a production build of the application
echo "Building the application..."
tsc
tsc-alias
