run-ethereum-server:
	cd backend
	echo "Compile Contracts"
	truffle compile
	echo "Migrate Contracts to Ganache"
	truffle migrate

run-ethereum-test:
	cd backend
	echo "Run Test"
	truffle test

init-backend:
	echo "Remove Old Node Modules"
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
