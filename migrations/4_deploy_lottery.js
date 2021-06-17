const Lottery = artifacts.require('Lottery');

module.exports = async function (deployer, network, addresses) {
  // Use deployer to state migration tasks.
  const [admin] = addresses;
  await deployer.deploy(Lottery, { from: admin, gas: '5000000' }); //currently 3021910
};
