// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const ERC721PresetMinterPauserAutoId = artifacts.require("ERC721PresetMinterPauserAutoId");

module.exports = function(deployer) {
  deployer.deploy(ERC721PresetMinterPauserAutoId, "My NFT","NFT", "ipfs://QmPqirRvGaMgZQBDiukf39zNQ7AW2YS5foH6J1tQxUYdkX");
};