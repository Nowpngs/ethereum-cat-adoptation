# Cat Adoption Platform

This is a decentralized cat adoption platform built on Ethereum. The platform allows users to create and adopt virtual cats using Ethereum smart contracts.

## Backend

### Setup

To set up the backend of the platform, you'll need to follow these steps:

1. Install Node.js on your machine if you haven't already. You can download it from the official Node.js website: https://nodejs.org/en/.
2. Clone this repository to your local machine: `git clone https://github.com/<username>/<project-name>.git`.
3. Navigate to the project directory: `cd <project-name>/backend`.
4. Install the project dependencies by running `npm install`.

### Local Development

To develop the backend of the platform locally, you can use the following steps:

1. Compile the smart contracts by running truffle compile. This will generate the compiled contract artifacts in the build/contracts directory.
2. Download and run Ganache by following the instructions on the official Ganache website: https://www.trufflesuite.com/ganache. Ganache will run a local blockchain that you can use to test your smart contracts.
3. Migrate the smart contracts to the local blockchain by running truffle migrate. This will deploy the contracts to the local blockchain and generate contract addresses that you can use to interact with the contracts.
4. Start the Express.js server by running node app.js. This will start the server and allow you to interact with the smart contracts using the provided API endpoints.

### Checking Contract Address
To check the contract address after deploying, you can use the following command:

1. Run truffle networks to see a list of all the networks you've deployed to, along with the contract addresses for each contract deployed.

### Testing

To test the backend of the platform, you can use the following steps:

1. Make sure you've compiled, deployed, and started the server as described in the Local Development section.
2. Use a tool like Postman to test the API endpoints and ensure that they are working as expected.
3. Optionally, you can also run automated tests by running `./ethereum_start.sh` script, which compiles, migrates, and tests your contracts.

Note: You can also run the Truffle development console to interact with your smart contracts and test your code. To do this, simply run truffle develop in your terminal. This will open the Truffle console, which you can use to deploy your smart contracts, interact with them, and test your code.

### Running the Backend

To start the backend of the platform, you can use the following steps:

1. Make sure you've compiled, deployed, and tested your contracts as described in the Local Development section.
2. Run `./backend_start.sh` script to start the Express backend server.

## Frontend

The frontend of the platform can be built using any web development framework or library. To interact with the smart contracts, you can use a library like Web3.js, which provides a JavaScript API for interacting with Ethereum.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.