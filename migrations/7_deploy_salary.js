const LotteryModSalary = artifacts.require('LotteryModSalary');
const Web3 = require('web3');

const BUSD = {
  address: "0x322E4612792dcDD60A50f9802C823e7B51eF1e31"
} // BUSD testnet

module.exports = async function (deployer, network, addresses) {
  const [admin] = addresses;
  await deployer.deploy(LotteryModSalary,BUSD.address, { from: admin });
};
