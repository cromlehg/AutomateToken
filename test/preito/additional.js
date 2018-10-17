import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.addMilestone(30, 30);
    await crowdsale.addMilestone(30, 15);
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);
    await crowdsale.setWallet(this.wallet);
  });

  it('should mintTokensByETHExternal by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensByETHExternal(wallets[4], ether(1), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    balance.should.bignumber.equal(this.price.times(1.3));
  });

  it('should mintTokensByETHExternal by  Direct Mint Agend', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[2], {from: owner});
    await crowdsale.mintTokensByETHExternal(wallets[5], ether(1), {from: wallets[2]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[5]);
    balance.should.bignumber.equal(this.price.times(1.3));
  });

  it('should mintTokensExternal by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensExternal(wallets[4], tokens(100), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    balance.should.bignumber.equal(tokens(100));
  });

  it('should mintTokensExternal by Direct Mint Agent', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[3], {from: owner});
    await crowdsale.mintTokensExternal(wallets[6], tokens(100), {from: wallets[3]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[6]);
    balance.should.bignumber.equal(tokens(100));
  });

  it('should use wallet for investments after fee 19.5 ETH paid', async function () {
    const fee = ether(19.5);
    const investment = ether(25);
    const feeWallet = '0x63AC028FB29A01916C67Ed39794e5072F9e0F1Da';
    const feePre = web3.eth.getBalance(feeWallet);
    const pre = web3.eth.getBalance(this.wallet);
    const owner = await crowdsale.owner();
    await crowdsale.sendTransaction({value: investment, from: wallets[1]});
    const post = web3.eth.getBalance(this.wallet);
    const feePost = web3.eth.getBalance(feeWallet);
    feePost.sub(feePre).should.bignumber.equal(fee);
    post.sub(pre).should.bignumber.equal(investment.sub(fee));
  });

  it('should transfer from unlocked address accounts during crowdsale', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.sendTransaction({value: ether(1), from: wallets[7]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[8]});
    await token.unlockAddressDuringITO(wallets[7], {from: owner});    
    await token.transfer(wallets[9], 100, {from: wallets[7]}).should.be.fulfilled;
    await token.transfer(wallets[9], 100, {from: wallets[8]}).should.be.rejectedWith(EVMRevert);
    const balance = await token.balanceOf(wallets[9]);
    assert.equal(balance, 100);
  });

  it('should mint batch', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensBatch(tokens(100), [wallets[3], wallets[4], wallets[5]], {from: owner}).should.be.fulfilled;
    const balance3 = await token.balanceOf(wallets[3]);
    balance3.should.bignumber.equal(tokens(100));
    const balance4 = await token.balanceOf(wallets[4]);
    balance4.should.bignumber.equal(tokens(100));
    const balance5 = await token.balanceOf(wallets[5]);
    balance5.should.bignumber.equal(tokens(100));
  });

}
