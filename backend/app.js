require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Web3 = require("web3");
const CatProfile = require("./build/contracts/CatProfile.json");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

const web3 = new Web3(process.env.ETHEREUM_NODE_URL);
const catContractAddress = process.env.CAT_CONTRACT_ADDRESS;
const catProfileContract = new web3.eth.Contract(
  CatProfile.abi,
  catContractAddress
);

// Authentication endpoint
app.post("/auth", async (req, res) => {
  const { address, secret } = req.body;

  try {
    // Retrieve the account associated with the provided address
    const account = await web3.eth.accounts.wallet.add(secret);

    // Ensure that the provided address matches the account address
    if (address.toLowerCase() !== account.address.toLowerCase()) {
      throw new Error("Invalid address or secret");
    }

    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Get available cats
app.get("/cats", async (req, res) => {
  try {
    const availableCats = await catProfileContract.methods
      .getAvailableCats()
      .call();

    res.json(
      availableCats.map((cat, index) => ({
        id: index,
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
        description: cat.description,
        availableForAdoption: cat.availableForAdoption,
        owner: cat.owner.toLowerCase(),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new cat
app.post("/cats", async (req, res) => {
  try {
    const account = req.headers["Address"];
    const { name, age, breed, description } = req.body;

    const gasLimit = await catProfileContract.methods
      .addCat(name, age, breed, description)
      .estimateGas({ from: account });

    const result = await catProfileContract.methods
      .addCat(name, age, breed, description)
      .send({ from: account, gas: gasLimit });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my Cats
app.get("/my-cats", async (req, res) => {
  try {
    const account = req.headers["Address"];
    const myCats = await catProfileContract.methods
      .getMyCats()
      .call({ from: account });

    res.json(
      myCats.map((cat, index) => ({
        id: cat.id,
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
        description: cat.description,
        availableForAdoption: cat.availableForAdoption,
        owner: cat.owner.toLowerCase(),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
