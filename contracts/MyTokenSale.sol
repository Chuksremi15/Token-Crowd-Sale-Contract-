// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {

   Kycontract Kyc;

   constructor (uint256 rate, address payable wallet, IERC20 token, Kycontract _Kyc)  Crowdsale(rate, wallet, token) public { Kyc = _Kyc; }
   

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view virtual override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(Kyc.kycCompleted(msg.sender), "Kyc not completed, purchase not allowed");
    }

}
