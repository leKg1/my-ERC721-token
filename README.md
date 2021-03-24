# my-ERC721-token

my-ERC721-token is about creating a non-fungible token (NFT) and deploy to a public testnet(Ropsten).

ERC721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique such as in real estate or collectibles.

## Setting up the Environment

We begin by creating a new project.

```bash
$ mkdir yourProjectFolder && cd yourProjectFolder
$ npm init -y
```
Then we install OpenZeppelin Contracts which has an implementation of ERC721.

```bash
npm install --save-dev @openzeppelin/contracts
```

Next we install Truffle  a development tool for deployment

```bash
npm install truffle
```

## Getting the contract artifacts

We will setup our Solidity project using ```truffle init``` to create a ```contracts``` directory and configuration to connect to a network.

```bash
$ npx truffle init
```

Then we are going to use Preset ```ERC721PresetMinterPauserAutoId``` which is an ERC721 that is preset so it can be minted (with auto token ID and metadata URI), paused and burned.

The Preset contracts have already been compiled, so we only need to copy the artifacts to the ```build/contracts``` directory.

```bash
$ mkdir -p build/contracts/
$ cp node_modules/@openzeppelin/contracts/build/contracts/* build/contracts/
```

Using your favorite editor create 2_deploy.js in the migrations directory with the following contents:

```bash
// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const ERC721PresetMinterPauserAutoId = artifacts.require("ERC721PresetMinterPauserAutoId");

module.exports = function(deployer) {
  deployer.deploy(ERC721PresetMinterPauserAutoId, "My NFT","NFT", "ipfs://your-asset-ipfs-hash");
};
```
## Deploy to a public testnet(Ropsten)

To deploy, we will use the instructions for [ Connecting to Public Test Networks with Truffle](https://forum.openzeppelin.com/t/connecting-to-public-test-networks-with-truffle/2960)

You will need the following:

- An Infura project ID (or a public node provider of your choice)
- ```@truffle/hdwallet-provider``` installed
- Configure ```truffle-config.js``` for Ropsten network
- A funded testnet account and mnemonic

My ```truffle-config.js``` has the following ropsten configuration:

```bash
ropsten: {
    provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infura_project_id}`),
    network_id: 3,       // Ropsten's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
```
## Deploy to Ropsten
```
$ npx truffle console --network ropsten
truffle(ropsten)> migrate --reset
```
We can then use our deployed contract.
```
truffle(ropsten)> nft = await ERC721PresetMinterPauserAutoId.deployed()
```
We can call the contract to read ```token metadata``` such as ```name```, ```symbol``` and ```baseURI```
```bash
truffle(ropsten)> await nft.name()
'My NFT'
truffle(ropsten)> await nft.symbol()
'NFT'
truffle(ropsten)> await nft.baseURI()
'ipfs://your-asset-ipfs-hash'
```
## Let's Mint
We can send a transaction to mint tokens to a given account, from an account with the minter role.
In our case we are minting from the account which deployed the token, which is given the minter role.

We will mint 1 NFT with token ID 0.
```bash
truffle(ropsten)> await nft.mint("your-account-address")
```
We can check the owner of the token and the token URI for the metadata
```bash
truffle(ropsten)> await nft.ownerOf(0)

truffle(ropsten)> await nft.tokenURI(0)
```
