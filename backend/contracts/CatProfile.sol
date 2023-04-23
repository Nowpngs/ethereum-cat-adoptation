// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CatProfile {
    struct Cat {
        string name;
        uint256 age;
        string breed;
        bool availableForAdoption;
        address owner;
        string description;
    }

    struct CatInfo {
        uint256 id;
        string name;
        uint256 age;
        string breed;
        string description;
        bool availableForAdoption;
        address owner;
    }

    Cat[] public cats;

    event CatAdded(
        string name,
        uint256 age,
        string breed,
        bool availableForAdoption,
        address owner,
        string description
    );

    event CatEdited(
        uint256 indexed catIndex,
        string name,
        uint256 age,
        string breed,
        string description
    );

    event CatOwnershipTransferred(
        uint256 indexed catIndex,
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner(uint256 _index) {
        require(_index < cats.length, "Invalid index");
        Cat storage cat = cats[_index];
        require(
            msg.sender == cat.owner,
            "Only the current owner can perform this operation"
        );
        _;
    }

    function addCat(
        string memory _name,
        uint256 _age,
        string memory _breed,
        string memory _description
    ) public {
        cats.push(Cat(_name, _age, _breed, true, msg.sender, _description));
        emit CatAdded(_name, _age, _breed, true, msg.sender, _description);
    }

    function editCat(
        uint256 _index,
        string memory _name,
        uint256 _age,
        string memory _breed,
        string memory _description
    ) public onlyOwner(_index) {
        Cat storage cat = cats[_index];
        cat.name = _name;
        cat.age = _age;
        cat.breed = _breed;
        cat.description = _description;

        emit CatEdited(_index, _name, _age, _breed, _description);
    }

    function getCat(
        uint256 _index
    )
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            bool,
            address,
            string memory
        )
    {
        require(_index < cats.length, "Invalid index");
        Cat storage cat = cats[_index];
        return (
            cat.name,
            cat.age,
            cat.breed,
            cat.availableForAdoption,
            cat.owner,
            cat.description
        );
    }

    function getNumberOfCats() public view returns (uint256) {
        return cats.length;
    }

    function transferCatOwnership(uint256 _index, address _newOwner) public {
        require(_index < cats.length, "Invalid index");
        Cat storage cat = cats[_index];
        cat.owner = _newOwner;
        cat.availableForAdoption = false;

        emit CatOwnershipTransferred(_index, msg.sender, _newOwner);
    }

    function getAvailableCats() public view returns (CatInfo[] memory) {
        uint256 availableCatsCount = 0;
        for (uint256 i = 0; i < cats.length; i++) {
            if (cats[i].availableForAdoption) {
                availableCatsCount++;
            }
        }

        if (availableCatsCount == 0) {
            return new CatInfo[](0);
        }

        CatInfo[] memory availableCats = new CatInfo[](availableCatsCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < cats.length; i++) {
            if (cats[i].availableForAdoption) {
                Cat storage cat = cats[i];
                availableCats[currentIndex] = CatInfo({
                    id: i,
                    name: cat.name,
                    age: cat.age,
                    breed: cat.breed,
                    description: cat.description,
                    availableForAdoption: cat.availableForAdoption,
                    owner: cat.owner
                });
                currentIndex++;
            }
        }
        return availableCats;
    }

    function getMyCats() public view returns (CatInfo[] memory) {
        uint256 myCatsCount = 0;
        for (uint256 i = 0; i < cats.length; i++) {
            if (cats[i].owner == msg.sender) {
                myCatsCount++;
            }
        }

        if (myCatsCount == 0) {
            return new CatInfo[](0);
        }

        CatInfo[] memory myCats = new CatInfo[](myCatsCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < cats.length; i++) {
            if (cats[i].owner == msg.sender) {
                Cat storage cat = cats[i];
                myCats[currentIndex] = CatInfo({
                    id: i,
                    name: cat.name,
                    age: cat.age,
                    breed: cat.breed,
                    description: cat.description,
                    availableForAdoption: cat.availableForAdoption,
                    owner: cat.owner
                });
                currentIndex++;
            }
        }

        return myCats;
    }
}
