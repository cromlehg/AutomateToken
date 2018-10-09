pragma solidity ^0.4.24;

import './AssembledCommonSale.sol';
import './ExtendedWalletsMintTokensFeature.sol';

contract ITO is ExtendedWalletsMintTokensFeature, AssembledCommonSale {

  function finish() public onlyOwner {
    mintExtendedTokens();
    token.finishMinting();
  }

}
