const Lottery = artifacts.require('Lottery');

module.exports = async function (deployer, network, addresses) {
  // Use deployer to state migration tasks.
  const [alice, bob] = addresses;
  // await deployer.deploy(Lottery, { from: alice, gas: '550000' });
  const lottery = await Lottery.deployed();
  // console.log('lottery', lottery.address);
};
