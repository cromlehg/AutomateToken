![AutomateToken](logo.png "AutomateToken")

# AMT token smart contract

* _Standard_        : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : AutomateToken
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_          : AMT
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_        : 18
* _Emission_        : Mintable
* _Crowdsales_      : 2
* _Fiat dependency_ : No
* _Tokens locked_   : Yes

## Smart-contracts description

The tokens for the bounty and the team are minted after the ICO  is finished.  
There is a special function to return 3rd party tokens that were sent by mistake (function retrieveTokens()).  
Each stage has a direct minting function in wei. This is made to support the external payment gateways.

### Contracts contains
1. _Token_ - Token contract
2. _PreITO_ - PreITO contract
3. _ITO_ - ITO contract
4. _Configurator_ - contract with main configuration for production

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.24
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distribution

* _Extra tokens (team, bounty, advisors)_       : 8%
* _Crowdsale tokens_                            : 92%

## Main network configuration

* _Extra tokens wallet_        : 0xA6b01Ed54c51f5158e1D8c85BFb3c45cB28F323C
* _Manager wallet_             : 0xdc820f1BD6DaDF2DaD597D2e85255003c596Ad8a

### Links
1. _Token_ - 
2. _PreITO_ - 
3. _ITO_ - 

### Features
* Manually mint tokens by owner or sale agent at any time until token minting finished. 
* Manually mint tokens in ether value by owner or sale agent at corresponding sale contract during current sale processing. 

### Crowdsale stages

#### PreITO
* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 1 ETH = 100 Tokens
* _Hardcap_                     : 10 000 ETH
* _Start_                       : Wed, 24 Oct 2018 00:00:00 GMT
* _Wallet_                      : 0xE4cfb1d905e922a93ddcA8528ab0f87b31E9e335

##### Milestones
1. 30 days, bonus +30%
2. 30 days, bonus +15%

#### ITO
* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 1 ETH = 100 Tokens
* _Hardcap_                     : 20 000 ETH
* _Start_                       : Mon, 24 Dec 2018 00:00:00 GMT
* _Wallet_                      : 0xE4cfb1d905e922a93ddcA8528ab0f87b31E9e335
 
##### Milestones
1. 30 days, bonus +10%
2. 60 days without bonus


## Kovan network configuration 

### Links
1. _Token_ - https://kovan.etherscan.io/address/0xacae7077d578b023ebac8c9e60850517bd83f3bd
2. _PreICO_ - https://kovan.etherscan.io/address/0x0edbbaadc0791b7d987813b65c8e60ebabb97fa5
3. _ICO_ - https://kovan.etherscan.io/address/0xff6c2b21452da56630b940449f11eaae9a5a686c


### Crowdsale stages

#### PreICO

* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 1 ETH = 1000 Tokens
* _Hardcap_                     : 10 000 ETH
* _Start_                       : Tue, 16 Oct 2018 00:00:00 GMT
* _Wallet_                      : 0x093A89bDb5CE905fecb6272ff3ac92f53350a79A

_Milestones_

1. 30 days, bonus +30%
2. 30 days, bonus +15%

##### Purchasers

* 0.5 ETH => 650 tokens (30% bonus), gas = 220058
https://kovan.etherscan.io/tx/0x8fce413c9985a12fabdd4d62633db73e8a42ef4a4264614c498a9d3971ace793

* 0.1 ETH =>  130 tokens (30% bonus), gas = 96866
https://kovan.etherscan.io/tx/0x31bb23ed422cb3208d74f1440036558550a19b0356ea3e7585c04d5b6a29e361

* 0.09 ETH => rejected txn, less then mininal investment limit, gas = 21303
https://kovan.etherscan.io/tx/0x78dbb4c1447f95e99fd52e388a99d6d167abd214eed5ca36497eec59ed438b8a

* 0.1 ETH => rejected txn, preITO is finished, gas = 30000
https://kovan.etherscan.io/tx/0x33f75a4a248be72985632526264e126e540ec5bf2a994b7c534f9c4da1beab11

##### Service operations

* finish, gas = 30351
https://kovan.etherscan.io/tx/0xead6b82497e02d5fcc5adf15ebd9f3e0242ae208d04f90ca5325b0e3acc0115d

#### ICO

* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 1 ETH = 1000 Tokens
* _Hardcap_                     : 20 000 ETH
* _Wallet_                      : 0x093A89bDb5CE905fecb6272ff3ac92f53350a79A
* _Start_                       : Tue, 16 Oct 2018 00:00:00 GMT
* _Bounty tokens percent_       : 8%
* _Bounty tokens wallet_        : 0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29

_Milestones_

1. 30 days, bonus +10%
2. 60 days without bonus

##### Purchasers
  
* 0.2 ETH => 220 tokens (10% bonus), gas = 71065
https://kovan.etherscan.io/tx/0xe36c562a3b6572f10e82b3f1afed05260c78f4a93c73a05ae3182689cc2d73b4

* 0.4 ETH => 400 tokens (without bonus), gas = 56758
https://kovan.etherscan.io/tx/0xb488810169667ad717ff033e798ba10bad73cd036024ce67b715f5cc91c0e916

##### Service operations

* setStart, gas = 27883
https://kovan.etherscan.io/tx/0x23f3eb197b01ea8be91eefbb66bd44ea15e83d93bd82130140b273229700228e

* finish, gas = 97094
https://kovan.etherscan.io/tx/0x869c63958d3fbb9660cbc9fbe1255be65495710ec7a9e0f7aca7f6202a46fb17

##### Token holders

https://kovan.etherscan.io/token/0xacae7077d578b023ebac8c9e60850517bd83f3bd#balances
