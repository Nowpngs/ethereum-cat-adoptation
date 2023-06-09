require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Web3 = require("web3");
const CatProfile = require("./build/contracts/CatProfile.json");
const OfferProfile = require("./build/contracts/CatMarket.json");

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

const offerContractAddress = process.env.OFFER_CONTRACT_ADDRESS;
const offerProfileContract = new web3.eth.Contract(
  OfferProfile.abi,
  offerContractAddress
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
    const account = req.headers["address"];
    const { name, age, breed, description } = req.body;

    const gasLimit = await catProfileContract.methods
      .addCat(name, age, breed, description)
      .estimateGas({ from: account });

    const result = await catProfileContract.methods
      .addCat(name, age, breed, description)
      .send({
        from: account,
        gas: gasLimit,
      });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a cat
app.patch("/cats/:id", async (req, res) => {
  try {
    const account = req.headers["address"];
    const { id } = req.params;
    const { name, age, breed, description } = req.body;

    const gasLimit = await catProfileContract.methods
      .editCat(id, name, age, breed, description)
      .estimateGas({ from: account });

    const result = await catProfileContract.methods
      .editCat(id, name, age, breed, description)
      .send({ from: account, gas: gasLimit });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my Cats
app.get("/my-cats", async (req, res) => {
  try {
    const account = req.headers["address"];
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

// Get my buying offers
app.get("/my-buying-offers", async (req, res) => {
  try {
    const account = req.headers["address"];
    const myBuyingOffers = await offerProfileContract.methods
      .getBuyerOffer()
      .call({ from: account });

    res.json(
      myBuyingOffers.map((offer, index) => ({
        id: offer.id,
        catId: offer.catId,
        catBreed: offer.catBreed,
        catName: offer.catName,
        buyerName: offer.buyerName,
        buyerEmail: offer.buyerEmail,
        buyerPhone: offer.buyerPhone,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my selling offers
app.get("/my-selling-offers", async (req, res) => {
  try {
    const account = req.headers["address"];
    const mySellingOffers = await offerProfileContract.methods
      .getSellerOffer()
      .call({ from: account });

    res.json(
      mySellingOffers
        .reduce((acc, offer) => {
          const existingCat = acc.find((cat) => cat.catId === offer.catId);
          if (existingCat) {
            existingCat.offer.push({ id: offer.id, price: offer.price });
          } else {
            acc.push({
              catId: offer.catId,
              catBreed: offer.catBreed,
              catName: offer.catName,
              offer: [
                {
                  id: offer.id,
                  buyerName: offer.buyerName,
                  buyerEmail: offer.buyerEmail,
                  buyerPhone: offer.buyerPhone,
                },
              ],
            });
          }
          return acc;
        }, [])
        .map((cat) => ({
          catId: cat.catId,
          catBreed: cat.catBreed,
          catName: cat.catName,
          offer: cat.offer,
        }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new offer
app.post("/offer", async (req, res) => {
  try {
    const account = req.headers["address"];
    const { catId, buyerName, buyerEmail, buyerPhone } = req.body;

    const gasLimit = await offerProfileContract.methods
      .createOffer(catId, buyerName, buyerEmail, buyerPhone)
      .estimateGas({ from: account });

    const result = await offerProfileContract.methods
      .createOffer(catId, buyerName, buyerEmail, buyerPhone)
      .send({
        from: account,
        gas: gasLimit,
      });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit offer
app.patch("/offer/:id", async (req, res) => {
  try {
    const account = req.headers["address"];
    const { id } = req.params;
    const { buyerName, buyerEmail, buyerPhone } = req.body;

    const gasLimit = await offerProfileContract.methods
      .editOffer(id, buyerName, buyerEmail, buyerPhone)
      .estimateGas({ from: account });

    const result = await offerProfileContract.methods
      .editOffer(id, buyerName, buyerEmail, buyerPhone)
      .send({ from: account, gas: gasLimit });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/confirm-offer", async (req, res) => {
  try {
    const account = req.headers["address"];
    const { id } = req.body;

    const gasLimit = await offerProfileContract.methods
      .confirmOffer(id)
      .estimateGas({ from: account });

    const result = await offerProfileContract.methods
      .confirmOffer(id)
      .send({ from: account, gas: gasLimit });

    res.json({ txHash: result.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
