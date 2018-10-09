pragma solidity ^0.4.24;

import './AssembledCommonSale.sol';
import './NextSaleAgentFeature.sol';
import './FeeFeature.sol';

contract PreITO is NextSaleAgentFeature, FeeFeature, AssembledCommonSale {

  function finish() public onlyOwner {
    token.setSaleAgent(nextSaleAgent);
  }

}
