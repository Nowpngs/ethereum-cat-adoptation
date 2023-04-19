#!/usr/bin/env bash
set -e

cd backend

echo "Compile Contracts"
truffle compile

echo "Migrate Contracts to Ganache"
truffle migrate

echo "Run Test"
truffle test
