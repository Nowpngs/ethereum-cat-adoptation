// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";
import "./CatProfile.sol";

contract CatMarket is Ownable {
    struct Offer {
        uint256 catIndex;
        address seller;
        uint256 price;
        bool isSold;
    }

    Offer[] public offers;
    CatProfile public catProfile;

    event OfferCreated(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address seller,
        uint256 price
    );
    event OfferCancelled(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address seller
    );
    event OfferSold(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address seller,
        address buyer,
        uint256 price
    );

    constructor(CatProfile _catProfile) {
        catProfile = _catProfile;
    }

    function createOffer(uint256 _catIndex, uint256 _price) public {
        require(_catIndex < catProfile.getNumberOfCats(), "Invalid cat index");
        (
            string memory name,
            uint256 age,
            string memory breed,
            bool availableForAdoption,
            address owner,
            string memory description
        ) = catProfile.getCat(_catIndex);
        require(availableForAdoption, "Cat not available for adoption");
        offers.push(Offer(_catIndex, msg.sender, _price, false));
        emit OfferCreated(offers.length - 1, _catIndex, msg.sender, _price);
    }

    function cancelOffer(uint256 _offerIndex) public {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        require(
            msg.sender == offer.seller,
            "Only the seller can cancel the offer"
        );
        require(offer.isSold == false, "Cannot cancel a sold offer");
        delete offers[_offerIndex];
        emit OfferCancelled(_offerIndex, offer.catIndex, offer.seller);
    }

    function buyCat(uint256 _offerIndex) public payable {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        require(msg.sender != offer.seller, "Cannot buy your own cat");
        require(offer.isSold == false, "Cat already sold");
        require(msg.value == offer.price, "Invalid price");
        address payable seller = payable(offer.seller);
        seller.transfer(msg.value);
        catProfile.transferCatOwnership(offer.catIndex, msg.sender);
        offer.isSold = true;
        emit OfferSold(
            _offerIndex,
            offer.catIndex,
            offer.seller,
            msg.sender,
            offer.price
        );
    }

    function getNumberOfOffers() public view returns (uint256) {
        return offers.length;
    }

    function getOffer(
        uint256 _offerIndex
    )
        public
        view
        returns (uint256 catIndex, address seller, uint256 price, bool isSold)
    {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        return (offer.catIndex, offer.seller, offer.price, offer.isSold);
    }
}
