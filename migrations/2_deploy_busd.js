const BUSD = artifacts.require('BUSD');

module.exports = async function (deployer, network, addresses) {
  // Use deployer to state migration tasks.
  const [alice, bob] = addresses;
  const decimal = 18;
  const initSupply = 1000000000;
  await deployer.deploy(BUSD, 'Mocked Binance USD', 'BUSD', decimal, initSupply * 10 ** decimal, { from: alice });
};
