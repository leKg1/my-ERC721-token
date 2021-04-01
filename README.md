# my-ERC721-token

my-ERC721-token is about how create a non-fungible token (NFT) and deploy to a public testnet(Rinkeby).

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

## Creating the smart contract

We will setup our Solidity project using ```truffle init``` to create a ```contracts``` directory and configuration to connect to a network.

```bash
$ npx truffle init
```

Then we are going to create our smart contract.

Using your favorite editor in ```contracts``` directory create a file ```AgkPicToken.sol``` and paste the following code:

```bash
// contracts/AgkPicToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AgkPicToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("AgkPicToken", "APT") {}

    function mintToken(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

Create ```2_deploy.js``` in the ```migrations``` directory with the following contents:

```bash
const YourSmartContract = artifacts.require("YourSmartContract");

module.exports = function(deployer) {
  deployer.deploy(YourSmartContract);
};
```
## Deploy to a public testnet(Rinkeby)

To deploy, we will use the instructions for [ Connecting to Public Test Networks with Truffle](https://forum.openzeppelin.com/t/connecting-to-public-test-networks-with-truffle/2960)

You will need the following:

- An Infura project ID (or a public node provider of your choice)
- ```@truffle/hdwallet-provider``` installed
- Configure ```truffle-config.js``` for Rinkeby network
- A funded testnet account and mnemonic

My ```truffle-config.js``` has the following rinkeby configuration:

```bash
 rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infura_project_id}`),
      network_id: 4,       // Rinkeby's id
      gas: 8500000,        
      gasPrice: 1000000000,  // 1 gwei (in wei) (default: 100 gwei)
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
```
## Deploy to Rinkeby
```
$ npx truffle console --network rinkeby
truffle(rinkeby)> migrate --reset
```
We can then use our deployed contract.
```
truffle(rinkeby)> nft = await AgkPicToken.deployed()
```
We can call the contract to read ```token data``` such as ```name```, ```symbol``` and ```smart contract address```
```bash
truffle(rinkeby)> await nft.name()

truffle(rinkeby)> await nft.symbol()

```
## Let's Mint
We can send a transaction to mint tokens to a given account, from an account with the minter role.

```bash
truffle(rinkeby)> await nft.mintToken("your-account-address", "your-item’s-metadata-path")
await nft.mintToken("0x0c9D471976833dC2E910527163DBACf780D30DFF", "ipfs://Qmd5FKMBWeBmNnMqRqHycxew3R1GzNU8ot29juUvJwpBiH")
```
We can check the owner of the token and the token URI for the metadata
```bash
truffle(rinkeby)> nft.ownerOf(1)

truffle(rinkeby)> nft.tokenURI(1)
```

## OpenSea
We can validate our metadata

OpenSea metadata validation is at: 

```https://rinkeby-api.opensea.io/asset/[nft contract address]/[token id]/validate```
