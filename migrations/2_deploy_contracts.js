const AgkPicToken = artifacts.require("AgkPicToken");

module.exports = function(deployer) {
  deployer.deploy(AgkPicToken);
};