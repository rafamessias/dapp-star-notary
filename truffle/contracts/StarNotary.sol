//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {
    struct Star {
        string name;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    //### Decentralized Star Notary Service Project - Requirement
    constructor() ERC721("StarNotary", "STN") {}

    function lookUptokenIdToStarInfo(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        bytes memory _tokenName = bytes(tokenIdToStarInfo[_tokenId].name);
        require(_tokenName.length > 0, "Could not found this token Id");
        return tokenIdToStarInfo[_tokenId].name;
    }

    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        require(
            _exists(_tokenId1) && _exists(_tokenId2),
            "Token does not exists"
        );
        require(
            ownerOf(_tokenId1) == msg.sender ||
                ownerOf(_tokenId2) == msg.sender,
            "Caller should be the owner of one of the tokens"
        );

        address ownerTokenId1 = ownerOf(_tokenId1);
        address ownerTokenId2 = ownerOf(_tokenId2);

        //passing one token to another
        IERC721(address(this)).safeTransferFrom(
            ownerTokenId1,
            ownerTokenId2,
            _tokenId1
        );

        IERC721(address(this)).safeTransferFrom(
            ownerTokenId2,
            ownerTokenId1,
            _tokenId2
        );
    }

    function transferStar(address _to1, uint256 _tokenId) public {
        require(_exists(_tokenId), "Token does not exists");
        require(
            ownerOf(_tokenId) == msg.sender,
            "Caller should be the owner of the token"
        );

        safeTransferFrom(msg.sender, _to1, _tokenId);
    }

    //### Decentralized Star Notary Service Project - Requirement - END

    //Create Star using the Struct
    function createStar(string memory _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);
        tokenIdToStarInfo[_tokenId] = newStar;
        _mint(msg.sender, _tokenId);
        approve(address(this), _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "You can't sell the Star you don't own"
        );
        starsForSale[_tokenId] = _price;
    }

    function _make_payable(address x) internal pure returns (address payable) {
        return payable(x);
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");

        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);

        require(msg.value > starCost, "You need to have enough Ether");

        IERC721(address(this)).safeTransferFrom(
            ownerAddress,
            msg.sender,
            _tokenId
        );

        address payable ownerAddressPayable = _make_payable(ownerAddress);
        ownerAddressPayable.transfer(starCost);

        if (msg.value > starCost) {
            address payable senderAddressPayable = _make_payable(msg.sender);
            senderAddressPayable.transfer(msg.value - starCost);
        }
    }
}
