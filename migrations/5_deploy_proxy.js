const LotteryNFT = artifacts.require('LotteryNFT');
const THB = artifacts.require('THB');
const Lottery = artifacts.require('Lottery');
const LotteryUpgradeProxy = artifacts.require('LotteryUpgradeProxy');

module.exports = async function (deployer, network, addresses) {
  // Use deployer to state migration tasks.
  const [alice, bob] = addresses;
  const thb = await THB.deployed();

  console.log('here');

  proxyAdmin = alice;
  lotteryOwner = bob;
  lotteryAdmin = bob;

  const abiEncodeData = web3.eth.abi.encodeFunctionCall({
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_thb",
        "type": "address"
      },
      {
        "internalType": "contract LotteryNFT",
        "name": "_lottery",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "_maxNumber",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_adminAddress",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, [thb.address, LotteryNFT.address, '5', lotteryOwner, lotteryAdmin]);

  const proxy = await deployer.deploy(LotteryUpgradeProxy, Lottery.address, proxyAdmin, abiEncodeData);
  console.log('proxy', proxy);

  const lotteryNft = await LotteryNFT.deployed();
  await lotteryNft.transferOwnership(LotteryUpgradeProxy.address);
};
