pragma solidity ^0.5.0;

contract ImageRegister {
    mapping(address => Image[]) ownerToImages;

    struct Image {
        string description;
        string title;
        string memeHash;
        uint256 uploadedAt;
    }

    event LogImageUploaded(string description, string title, string memeHash, address indexed owner);

    function uploadImage(string memory description, string memory title, string memory memeHash) 
        public returns (bool _success) {
            require(bytes(description).length > 0, 'description must be less than 256 characters');
            uint256 uploadedOn = now;

            Image memory image = Image(description, title, memeHash, uploadedOn);
            ownerToImages[msg.sender].push(image);
            emit LogImageUploaded(description, title, memeHash, msg.sender);
            
            _success = true;
    }

    function getImageCount(address owner) public view returns(uint256) {
        return ownerToImages[owner].length;
    }

    function getImage(address owner, uint256 index) public view returns (
        string memory description,
        string memory title,
        string memory memeHash
    ) {
        Image memory image = ownerToImages[owner][index];
        return (
            image.description,
            image.title,
            image.memeHash
        );
    }
}