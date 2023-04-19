const CatProfile = artifacts.require("CatProfile");

module.exports = function (deployer) {
  deployer.deploy(CatProfile);
};
