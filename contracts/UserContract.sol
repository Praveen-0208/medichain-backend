pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract UserContract{
    struct User{
        address userAddress;
        string name;
        string phone;
    }
    User[] allUsers;

    function addUser(address userAddress,string memory name,string memory phone) public returns(bool status){
        allUsers.push(User(userAddress,name,phone));
        return true;
    }
}