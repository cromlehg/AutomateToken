import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;
  const milestones = [
    {day: 6, bonus: 15},
    {day: 6, bonus: 13},
    {day: 6, bonus: 11},
    {day: 6, bonus: 9},
    {day: 6, bonus: 7},
    {day: 6, bonus: 5},
    {day: 7, bonus: 3}
  ];

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  before(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);   
    await crowdsale.addMilestone(7, 15);
    await crowdsale.addMilestone(7, 13);
    await crowdsale.addMilestone(7, 11);
    await crowdsale.addMilestone(7, 9);
    await crowdsale.addMilestone(7, 7);
    await crowdsale.addMilestone(7, 5);
    await crowdsale.addMilestone(7, 3);
    await crowdsale.setWallet(this.wallet);
    await crowdsale.addWallet(wallets[3], this.TeamTokensPercent);
  });

  milestones.forEach((milestone, i) => {
    it(`should add ${milestone.bonus}% bonus for milestone #${i}`, async function () {
      await increaseTimeTo(latestTime() + duration.days(milestone.day));
      await crowdsale.sendTransaction({value: ether(1), from: wallets[i]});
      const balance = await token.balanceOf(wallets[i]);
      const value = this.price.times(1 + milestone.bonus / 100);
      balance.should.be.bignumber.equal(value);
    });
  });

}
