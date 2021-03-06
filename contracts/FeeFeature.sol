pragma solidity ^0.4.24;

import './CommonSale.sol';

contract FeeFeature is CommonSale {

  uint public constant devLimit = 19500000000000000000;

  uint public devFeePaid;

  address public constant feeWallet = 0x63AC028FB29A01916C67Ed39794e5072F9e0F1Da;

  function fallback() internal minInvestLimited(msg.value) returns(uint) {
    require(now >= start && now < endSaleDate());
    uint toWallet = msg.value;
    if(devFeePaid < devLimit) {
      uint feeNeeds = devLimit.sub(devFeePaid);
      if(feeNeeds >= toWallet) {
        feeWallet.transfer(toWallet);
        devFeePaid = devFeePaid.add(toWallet);
        toWallet = 0;
      } else {
        feeWallet.transfer(feeNeeds);
        devFeePaid = devFeePaid.add(feeNeeds);
        toWallet = toWallet.sub(feeNeeds);
      }
    }
    if(toWallet != 0) {
      wallet.transfer(toWallet);
    }
    updateInvested(msg.value);
    return mintTokensByETH(msg.sender, msg.value);
  }

}

