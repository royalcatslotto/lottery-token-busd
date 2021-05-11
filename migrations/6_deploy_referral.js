const LotteryReferral = artifacts.require('LotteryReferral');
const Web3 = require('web3');

module.exports = async function (deployer, network, addresses) {
  const [admin] = addresses;
  await deployer.deploy(LotteryReferral, { from: admin });
};
