pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyUniqueAsset is ERC721{

using Counters for Counters.Counter;
Counters.Counter private _tokenIds;
mapping(string => uint8) hashes;

constructor() public ERC721("MyUniqueAsset", "MUA") {}

function awardItem(address recipient, string memory hash, string memory metadata)
  public
  returns (uint256)
{
  require(hashes[hash] != 1, "Hash has already been used!");
  hashes[hash] = 1;
  _tokenIds.increment();
  uint256 newItemId = _tokenIds.current();
  _mint(recipient, newItemId);
  _setTokenURI(newItemId, metadata);
  return newItemId;
}
}

  // Asset Hash: 'QmR5jbc7szqmSmN1NgoFZFVR4f4ee98g6jyoDLLaSBtpCM'
  // MetadaHash: 'QmPqirRvGaMgZQBDiukf39zNQ7AW2YS5foH6J1tQxUYdkX'
  // Metada URL: 'ipfs://QmPqirRvGaMgZQBDiukf39zNQ7AW2YS5foH6J1tQxUYdkX'