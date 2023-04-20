const CatProfile = artifacts.require("CatProfile");
const CatMarket = artifacts.require("CatMarket");
const Ownable = artifacts.require("Ownable");

module.exports = async function(deployer) {
  await deployer.deploy(CatProfile);
  const catProfileInstance = await CatProfile.deployed();
  await deployer.deploy(CatMarket, catProfileInstance.address);
  await deployer.deploy(Ownable);
};