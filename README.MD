# Cat Adoption Platform

This is a decentralized cat adoption platform built on Ethereum. The platform allows users to create and adopt virtual cats using Ethereum smart contracts.

## Table of Contents
- [Installation](#installation)
- [Local Development](#local-development)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Testing](#testing)
- [License](#license)

## Installation
To install and set up the project, clone the repository and install the dependencies for the backend and frontend:

```sh
make init-backend
make init-frontend
```
## Local Development
### Backend

To develop the backend of the platform locally, follow these steps:

1. Start up a Ganache Ethereum node server
2. Compile and migrate the contract to the Ethereum server using:
```sh
make run-ethereum-server
```
3. Configure the .env file according to the .env.example provided
4. To get the contract address, run:
```sh
truffle network
```
5. After configuring the .env file, start the ExpressJS backend using:
```sh
make run-backend
```
### Frontend

To develop the frontend of the platform locally, follow these steps:
1. Start the frontend using:
```sh
make run-frontend
```

### Testing

To test the backend of the platform, follow these steps:

1. Make sure you have compiled, deployed, and started the server as described in the Local Development section
2. Run `make run-ethereum-test` to execute the tests

Note: You can also run the Truffle development console to interact with your smart contracts and test your code. To do this, simply run `truffle develop` in your terminal. This will open the Truffle console, which you can use to deploy your smart contracts, interact with them, and test your code.

To test the frontend, follow these steps:

1. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
2. Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.