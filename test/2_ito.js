import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './ito/capped';
import common from './ito/common';
import milestonebonus from './ito/milestonebonus';
import bounty from './ito/bounty';
import additional from './ito/additional';

const token = artifacts.require('Token.sol');
const crowdsale = artifacts.require('ITO.sol');


contract('ITO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, accounts);
});

contract('ITO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});

contract('ITO - milestonebonus features test', function (accounts) {
  before(config);
  milestonebonus(token, crowdsale, accounts);
});

contract('ITO - bounty test', function (accounts) {
  before(config);
  bounty(token, crowdsale, accounts);
});

contract('ITO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('24 Dec 2018 00:00:00 GMT');
  this.period = 90;
  this.price = tokens(100);
  this.hardcap = ether(20000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0xE4cfb1d905e922a93ddcA8528ab0f87b31E9e335';
  this.TeamTokensPercent = 8;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
