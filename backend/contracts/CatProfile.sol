// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CatProfile {
    struct Cat {
        string name;
        uint256 age;
        string breed;
        bool availableForAdoption;
    }

    Cat[] public cats;
    address public owner;

    event CatAdded(
        string name,
        uint256 age,
        string breed,
        bool availableForAdoption
    );

    constructor() {
        owner = msg.sender;
    }

    function addCat(
        string memory _name,
        uint256 _age,
        string memory _breed,
        bool _availableForAdoption
    ) public {
        require(msg.sender == owner, "Only the owner can add cats");
        cats.push(Cat(_name, _age, _breed, _availableForAdoption));
        emit CatAdded(_name, _age, _breed, _availableForAdoption);
    }

    function getCat(
        uint256 _index
    ) public view returns (string memory, uint256, string memory, bool) {
        require(_index < cats.length, "Invalid index");
        Cat storage cat = cats[_index];
        return (cat.name, cat.age, cat.breed, cat.availableForAdoption);
    }

    function getNumberOfCats() public view returns (uint256) {
        return cats.length;
    }
}
