const Lottery = artifacts.require('Lottery');

module.exports = async function (deployer, addresses) {
  // Use deployer to state migration tasks.
  const [alice] = addresses;
  await deployer.deploy(Lottery, { from: alice, gas: '1000000' });
  // const lottery = await Lottery.deployed();
  // console.log('lottery', lottery.address);
};
