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

app.get("/cats", async (req, res) => {
  const numberOfCats = await catProfileContract.methods
    .getNumberOfCats()
    .call();
  const cats = [];

  for (let i = 0; i < numberOfCats; i++) {
    const cat = await catProfileContract.methods.getCat(i).call();
    cats.push(cat);
  }

  res.json(cats);
});

app.post("/cats", async (req, res) => {
  const { name, age, breed, availableForAdoption } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();

    const gasLimit = await catProfileContract.methods
      .addCat(name, age, breed, availableForAdoption)
      .estimateGas({ from: accounts[0] });

    const result = await catProfileContract.methods
      .addCat(name, age, breed, availableForAdoption)
      .send({ from: accounts[0], gas: gasLimit });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
