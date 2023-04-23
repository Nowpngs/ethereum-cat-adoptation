// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CatProfile.sol";

contract CatMarket {
    struct Offer {
        uint256 catIndex;
        address buyer;
        uint256 price;
        bool isPending;
    }

    struct OfferDetail {
        uint256 id;
        uint256 catId;
        string catName;
        string catBreed;
        uint256 price;
    }

    Offer[] public offers;
    CatProfile public catProfile;

    mapping(address => mapping(uint256 => bool)) public hasCreatedOffer;

    event OfferCreated(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address buyer,
        uint256 price
    );
    event OfferCancelled(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address buyer
    );
    event OfferEdited(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address buyer,
        uint256 price
    );
    event OfferConfirmed(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address seller,
        address buyer,
        uint256 price
    );

    constructor(CatProfile _catProfile) {
        catProfile = _catProfile;
    }

    function getBuyerOffer() public view returns (OfferDetail[] memory) {
        OfferDetail[] memory buyerOffers = new OfferDetail[](offers.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < offers.length; i++) {
            Offer storage offer = offers[i];
            if (offer.buyer == msg.sender && offer.isPending) {
                (
                    string memory name,
                    uint256 age,
                    string memory breed,
                    bool availableForAdoption,
                    address owner,
                    string memory description
                ) = catProfile.getCat(offer.catIndex);
                buyerOffers[counter] = OfferDetail(
                    i,
                    offer.catIndex,
                    name,
                    breed,
                    offer.price
                );
                counter++;
            }
        }
        return buyerOffers;
    }

    function createOffer(uint256 _catIndex, uint256 _price) public payable {
        require(_catIndex < catProfile.getNumberOfCats(), "Invalid cat index");
        (
            string memory name,
            uint256 age,
            string memory breed,
            bool isAdoptable,
            address owner,
            string memory description
        ) = catProfile.getCat(_catIndex);
        require(isAdoptable, "Cat not available for adoption");
        require(msg.value == _price, "Incorrect amount sent");
        require(
            !hasCreatedOffer[msg.sender][_catIndex],
            "Buyer already created an offer"
        );
        hasCreatedOffer[msg.sender][_catIndex] = true;
        offers.push(Offer(_catIndex, msg.sender, _price, true));
        emit OfferCreated(offers.length - 1, _catIndex, msg.sender, _price);
    }

    function editOffer(uint256 _offerIndex, uint256 _newPrice) public {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        require(msg.sender == offer.buyer, "Only the buyer can edit the offer");
        require(offer.isPending, "Cannot edit a confirmed offer");
        offer.price = _newPrice;
        emit OfferEdited(_offerIndex, offer.catIndex, offer.buyer, _newPrice);
    }

    function cancelOffer(uint256 _offerIndex) public {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        require(
            msg.sender == offer.buyer,
            "Only the seller can cancel the offer"
        );
        require(offer.isPending, "Cannot cancel a confirmed offer");
        hasCreatedOffer[offer.buyer][offer.catIndex] = false;
        delete offers[_offerIndex];
        emit OfferCancelled(_offerIndex, offer.catIndex, offer.buyer);
    }

    function confirmOrder(uint256 _offerIndex) public {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        (
            string memory name,
            uint256 age,
            string memory breed,
            bool availableForAdoption,
            address owner,
            string memory description
        ) = catProfile.getCat(offer.catIndex);
        require(msg.sender == owner, "Only the seller can confirm the offer");
        require(availableForAdoption, "Cat not available for adoption");

        catProfile.transferCatOwnership(offer.catIndex, offer.buyer);
        offer.isPending = false;

        emit OfferConfirmed(
            _offerIndex,
            offer.catIndex,
            msg.sender,
            offer.buyer,
            offer.price
        );
    }
}
