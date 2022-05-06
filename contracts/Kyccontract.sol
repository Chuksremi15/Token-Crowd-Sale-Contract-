// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Kycontract is Ownable {
     
     mapping(address => bool) allowed;

     function setKycCompleted(address _addr) public onlyOwner {
         allowed[_addr] = true;
     }

      function setKycRevoked(address _addr) public onlyOwner {
         allowed[_addr] = false;
     }

     function kycCompleted(address _addr) public view onlyOwner returns(bool) {
        return allowed[_addr];
     }
    
}