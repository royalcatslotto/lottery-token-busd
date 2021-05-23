const LotteryReferral = artifacts.require('LotteryReferral');
const Web3 = require('web3');

const BUSD = {
  //address: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
  address: "0xDa91a1aee4d7829c118cD6218CDA2cB2C56dd010" // KUB Token
} // BUSD Mainnet

module.exports = async function (deployer, network, addresses) {
  const [admin] = addresses;
  await deployer.deploy(LotteryReferral,BUSD.address, { from: admin });
};
