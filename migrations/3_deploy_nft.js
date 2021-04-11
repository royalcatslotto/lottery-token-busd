const LotteryNFT = artifacts.require('LotteryNFT');

module.exports = async function (deployer, network, addresses) {
  // Use deployer to state migration tasks.
  const [alice, bob] = addresses;
  await deployer.deploy(LotteryNFT, 'Token Lottery NFT', 'TLN', { from: alice });
};
