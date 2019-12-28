pragma solidity ^0.5.0;

contract Meme {
    string memeHash1;

    function set(string memory _memeHash) public {
        memeHash1 = _memeHash;
    }

    function get() public view returns (string memory) {
        return memeHash1;
    }
}