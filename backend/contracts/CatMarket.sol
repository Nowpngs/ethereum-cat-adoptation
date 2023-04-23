// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CatProfile.sol";

contract CatMarket {
    struct Offer {
        uint256 catIndex;
        address buyer;
        bool isPending;
        string buyerName;
        string buyerEmail;
        string buyerPhone;
    }

    struct OfferDetail {
        uint256 id;
        uint256 catId;
        string catName;
        string catBreed;
        string buyerName;
        string buyerEmail;
        string buyerPhone;
    }

    Offer[] public offers;
    CatProfile public catProfile;

    mapping(address => mapping(uint256 => bool)) public hasCreatedOffer;

    event OfferCreated(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address buyer
    );
    event OfferCancelled(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address buyer
    );
    event OfferEdited(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address buyer
    );
    event OfferConfirmed(
        uint256 indexed offerIndex,
        uint256 catIndex,
        address seller,
        address buyer
    );

    constructor(CatProfile _catProfile) {
        catProfile = _catProfile;
    }

    function getBuyerOffer() public view returns (OfferDetail[] memory) {
        uint256 myOffersCount = 0;
        for (uint256 i = 0; i < offers.length; i++) {
            (
                string memory name,
                uint256 age,
                string memory breed,
                bool availableForAdoption,
                address owner,
                string memory description
            ) = catProfile.getCat(offers[i].catIndex);
            if (
                offers[i].buyer == msg.sender &&
                offers[i].isPending &&
                availableForAdoption == true
            ) {
                myOffersCount++;
            }
        }

        if (myOffersCount == 0) {
            return new OfferDetail[](0);
        }

        OfferDetail[] memory buyerOffers = new OfferDetail[](myOffersCount);
        uint256 curentIndex = 0;

        for (uint256 i = 0; i < offers.length; i++) {
            (
                string memory name,
                uint256 age,
                string memory breed,
                bool availableForAdoption,
                address owner,
                string memory description
            ) = catProfile.getCat(offers[i].catIndex);
            if (
                offers[i].buyer == msg.sender &&
                offers[i].isPending &&
                availableForAdoption == true
            ) {
                buyerOffers[curentIndex] = OfferDetail(
                    i,
                    offers[i].catIndex,
                    name,
                    breed,
                    offers[i].buyerName,
                    offers[i].buyerEmail,
                    offers[i].buyerPhone
                );
                curentIndex++;
            }
        }
        return buyerOffers;
    }

    function getSellerOffer() public view returns (OfferDetail[] memory) {
        uint256 myOffersCount = 0;
        for (uint256 i = 0; i < offers.length; i++) {
            (
                string memory name,
                uint256 age,
                string memory breed,
                bool availableForAdoption,
                address owner,
                string memory description
            ) = catProfile.getCat(offers[i].catIndex);
            if (
                owner == msg.sender &&
                offers[i].isPending &&
                availableForAdoption == true
            ) {
                myOffersCount++;
            }
        }

        if (myOffersCount == 0) {
            return new OfferDetail[](0);
        }

        OfferDetail[] memory sellerOffers = new OfferDetail[](myOffersCount);
        uint256 curentIndex = 0;

        for (uint256 i = 0; i < offers.length; i++) {
            (
                string memory name,
                uint256 age,
                string memory breed,
                bool availableForAdoption,
                address owner,
                string memory description
            ) = catProfile.getCat(offers[i].catIndex);
            if (
                owner == msg.sender &&
                offers[i].isPending &&
                availableForAdoption == true
            ) {
                sellerOffers[curentIndex] = OfferDetail(
                    i,
                    offers[i].catIndex,
                    name,
                    breed,
                    offers[i].buyerName,
                    offers[i].buyerEmail,
                    offers[i].buyerPhone
                );
                curentIndex++;
            }
        }
        return sellerOffers;
    }

    function createOffer(
        uint256 _catIndex,
        string memory _buyerName,
        string memory _buyerEmail,
        string memory _buyerPhone
    ) public payable {
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
        require(
            !hasCreatedOffer[msg.sender][_catIndex],
            "Buyer already created an offer"
        );
        hasCreatedOffer[msg.sender][_catIndex] = true;
        offers.push(
            Offer(
                _catIndex,
                msg.sender,
                true,
                _buyerName,
                _buyerEmail,
                _buyerPhone
            )
        );
        emit OfferCreated(offers.length - 1, _catIndex, msg.sender);
    }

    function editOffer(
        uint256 _offerIndex,
        string memory _buyerName,
        string memory _buyerEmail,
        string memory _buyerPhone
    ) public {
        require(_offerIndex < offers.length, "Invalid offer index");
        Offer storage offer = offers[_offerIndex];
        require(msg.sender == offer.buyer, "Only the buyer can edit the offer");
        require(offer.isPending, "Cannot edit a confirmed offer");
        offer.buyerName = _buyerName;
        offer.buyerEmail = _buyerEmail;
        offer.buyerPhone = _buyerPhone;
        emit OfferEdited(_offerIndex, offer.catIndex, offer.buyer);
    }

    function confirmOffer(uint256 _offerIndex) public {
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
            offer.buyer
        );
    }
}
