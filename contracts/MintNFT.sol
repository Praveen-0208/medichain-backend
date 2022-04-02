// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract MintNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    event StoreMySharingData (address indexed myAddress,address indexed viewerAddress,uint viewerRole);

    constructor() ERC721("Metaverse", "METT") {
    }

    function createToken(string memory fileHash) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, fileHash);
        return newItemId;
    }

    function shareToken(address myAddress, address viewerAddress,uint viewerRole) public {
        emit StoreMySharingData(myAddress, viewerAddress, viewerRole);
    }
}