![AutomateToken](logo.png "AutomateToken")

# ATM token smart contract

* _Standard_        : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : AutomateToken
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_          : ATM
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
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
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



