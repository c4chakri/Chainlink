Custom Chainlink Oracle

This project implements a Custom Chainlink Oracle that allows smart contracts to request and receive data from an on-chain source. The oracle is designed to fulfill data requests without relying on external APIs, generating data on its own.

Overview

* CustomOracle.sol: The smart contract that acts as the oracle, handling data requests and fulfilling them.
* ConsumerOracle.sol: A consumer contract that interacts with the CustomOracle to request and store data.
* oracleNode.js: A Node.js script that listens for data requests and fulfills them using the ethers.js library.

Getting Started

Prerequisites

* Node.js (version 14 or later)
* npm (Node Package Manager)
* Solidity compiler (version 0.8.0 or later)
* An Ethereum wallet and an Infura or Alchemy account (for connecting to the Ethereum network)

Installation

Clone the Repository

bash

Copy code

git clone <repository-url>

cd <repository-directory>

1. Install Dependencies

bash

Copy code

npm install dotenv ethers

1. Setup Environment Variables

Create a .env file in the project root directory with the following content:

makefile

Copy code

INFURA\_URL=<your-infura-url>

PRIVATE\_KEY=<your-wallet-private-key>

CONTRACT\_ADDRESS=<deployed-custom-oracle-address>

1. Deployment
1. Deploy the CustomOracle Contract

Use a tool like Remix or Hardhat to deploy the CustomOracle.sol contract to your preferred Ethereum network (testnet or mainnet).

1. Deploy the ConsumerOracle Contract

Deploy the ConsumerOracle.sol contract, passing the address of the deployed CustomOracle contract as a constructor argument.

Running the Oracle Node

Start the Oracle Node

Run the oracle node script using Node.js:

bash

Copy code

node oracleNode.js

1. This will start listening for data requests on the CustomOracle contract and fulfill them with custom data.

Interacting with the Consumer Contract

1. Request Data

Call the requestDataFromOracle() function in the ConsumerOracle contract to initiate a data request.

1. Update Data

After the oracle fulfills the request, call the updateData() function in the ConsumerOracle contract to retrieve and store the fulfilled data.

1. Check the Current Data

You can check the value of currentData in the ConsumerOracle contract to see the fulfilled data.

Example Usage

Request Data:

solidity

Copy code

consumerOracle.requestDataFromOracle();

* Update Data:

solidity

Copy code

consumerOracle.updateData();

* Code Structure
* Contracts
* CustomOracle.sol: Main oracle contract.
* ConsumerOracle.sol: Contract that consumes data from the oracle.
* Scripts
* oracleNode.js: Node.js script for the oracle.

Events

* DataRequested(bytes32 indexed requestId, address requester): Emitted when a data request is made.
* DataFulfilled(bytes32 indexed requestId, uint256 data): Emitted when data is fulfilled.

License

This project is licensed under the MIT License. See the LICENSE file for details.