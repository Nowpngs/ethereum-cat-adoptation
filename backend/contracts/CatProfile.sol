// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";

contract CatProfile is Ownable {
    struct Cat {
        string name;
        uint256 age;
        string breed;
        bool availableForAdoption;
        address owner;
    }

    Cat[] public cats;

    event CatAdded(
        string name,
        uint256 age,
        string breed,
        bool availableForAdoption,
        address owner
    );
    event CatOwnershipTransferred(
        uint256 indexed catIndex,
        address indexed previousOwner,
        address indexed newOwner
    );

    function addCat(
        string memory _name,
        uint256 _age,
        string memory _breed
    ) public {
        cats.push(Cat(_name, _age, _breed, true, msg.sender));
        emit CatAdded(_name, _age, _breed, true, msg.sender);
    }

    function getCat(
        uint256 _index
    )
        public
        view
        returns (string memory, uint256, string memory, bool, address)
    {
        require(_index < cats.length, "Invalid index");
        Cat storage cat = cats[_index];
        return (
            cat.name,
            cat.age,
            cat.breed,
            cat.availableForAdoption,
            cat.owner
        );
    }

    function getNumberOfCats() public view returns (uint256) {
        return cats.length;
    }

    function transferCatOwnership(uint256 _index, address _newOwner) public {
        require(_index < cats.length, "Invalid index");
        Cat storage cat = cats[_index];
        require(
            msg.sender == cat.owner,
            "Only the current owner can transfer ownership"
        );
        require(_newOwner != address(0), "Invalid new owner");

        cat.owner = _newOwner;
        cat.availableForAdoption = false;

        emit CatOwnershipTransferred(_index, msg.sender, _newOwner);
    }
}
