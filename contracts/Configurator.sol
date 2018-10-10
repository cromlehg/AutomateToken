pragma solidity ^0.4.24;

import './ownership/Ownable.sol';
import './Token.sol';
import './PreITO.sol';
import './ITO.sol';

contract Configurator is Ownable {

  Token public token;

  PreITO public preITO;

  ITO public ito;

  function deploy() public onlyOwner {

    token = new Token();

    preITO = new PreITO();

    preITO.setWallet(0xE4cfb1d905e922a93ddcA8528ab0f87b31E9e335);
    preITO.setStart(1540339200);
    preITO.addMilestone(30, 30);
    preITO.addMilestone(30, 15);
    preITO.setPrice(1000000000000000000000);
    preITO.setMinInvestedLimit(100000000000000000);
    preITO.setHardcap(10000000000000000000000);
    preITO.setToken(token);

    token.setSaleAgent(preITO);

    ito = new ITO();

    ito.setWallet(0xE4cfb1d905e922a93ddcA8528ab0f87b31E9e335);
    ito.setStart(1545609600);
    ito.addMilestone(30, 10);
    ito.addMilestone(60, 0);
    ito.setPrice(1000000000000000000000);
    ito.setMinInvestedLimit(100000000000000000);
    ito.setHardcap(20000000000000000000000);
    ito.addWallet(0xA6b01Ed54c51f5158e1D8c85BFb3c45cB28F323C, 8);
    ito.setToken(token);

    preITO.setNextSaleAgent(ito);

    address manager = 0xdc820f1BD6DaDF2DaD597D2e85255003c596Ad8a;

    token.transferOwnership(manager);
    preITO.transferOwnership(manager);
    ito.transferOwnership(manager);
  }

}

