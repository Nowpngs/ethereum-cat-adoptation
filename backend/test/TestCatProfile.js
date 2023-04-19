const CatProfile = artifacts.require("CatProfile");

contract("CatProfile", (accounts) => {
  let catProfileInstance;

  before(async () => {
    catProfileInstance = await CatProfile.deployed();
  });

  it("should allow adding a new cat profile", async () => {
    const name = "Fluffy";
    const age = 3;
    const breed = "Persian";
    const availableForAdoption = true;

    const result = await catProfileInstance.addCat(
      name,
      age,
      breed,
      availableForAdoption,
      { from: accounts[0] }
    );
    const catProfileAddedEvent = result.logs[0].args;

    assert.equal(
      catProfileAddedEvent.name,
      name,
      "The cat's name was not added correctly."
    );
    assert.equal(
      catProfileAddedEvent.breed,
      breed,
      "The cat's breed was not added correctly."
    );
    assert.equal(
      catProfileAddedEvent.age,
      age,
      "The cat's age was not added correctly."
    );
    assert.equal(
      catProfileAddedEvent.availableForAdoption,
      availableForAdoption,
      "The cat's availableForAdoption was not added correctly."
    );
  });

  it("should return a cat profile by ID", async () => {
    const name = "Fluffy";
    const age = 3;
    const breed = "Persian";
    const availableForAdoption = true;

    await catProfileInstance.addCat(name, age, breed, availableForAdoption, {
      from: accounts[0],
    });

    const catProfile = await catProfileInstance.getCat(0);

    assert.equal(
      catProfile[0],
      name,
      "The cat's name was not retrieved correctly."
    );
    assert.equal(
      catProfile[2],
      breed,
      "The cat's breed was not retrieved correctly."
    );
    assert.equal(
      catProfile[1],
      age,
      "The cat's age was not retrieved correctly."
    );
    assert.equal(
      catProfile[3],
      availableForAdoption,
      "The cat's availableForAdoption was not retrieved correctly."
    );
  });
});
