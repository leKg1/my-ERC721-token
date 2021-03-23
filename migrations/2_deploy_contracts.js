var MyUniqueAsset = artifacts.require("MyUniqueAsset");
module.exports = function(deployer) {
  deployer.deploy(MyUniqueAsset);
};