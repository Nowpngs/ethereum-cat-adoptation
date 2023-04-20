run-ethereum-server:
	echo "Compile Contracts"
	cd backend && truffle compile
	echo "Migrate Contracts to Ganache"
	cd backend && truffle migrate

get-contract-address:
	echo "Get Contract Address"
	cd backend && truffle networks

run-ethereum-test:
	echo "Run Test"
	cd backend && truffle test

init-backend:
	echo "Remove Old Node Modules"
	--help
	rm -rf backend/node_modules
	echo "Installing Backend Dependencies"
	cd backend && npm install

run-backend:
	echo "Starting Backend"
	cd backend && node app.js

init-frontend:
	echo "Remove Old Node Modules"
	rm -rf frontend/node_modules
	echo "Installing Frontend Dependencies"
	cd frontend && npm install

run-frontend:
	echo "Starting Frontend"
	cd frontend && ng serve


