const LotteryNFT = artifacts.require('LotteryNFT');
const BUSD = artifacts.require('BUSD'); // BUSD Testnet
// const BUSD = {
//   address: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
// } // BUSD Mainnet

const Lottery = artifacts.require('Lottery');
const LotteryUpgradeProxy = artifacts.require('LotteryUpgradeProxy');
const Web3 = require('web3');

module.exports = async function (deployer, network, addresses) {
  // Use deployer to state migration tasks.
  const [admin, alice] = addresses;
  const minPrice = Web3.utils.toWei('1', 'ether');
  proxyAdmin = admin;
  lotteryOwner = alice;
  lotteryAdmin = alice;

  //BUSD.address = "";
  //console.log('BUSD.address', BUSD.address);
  console.log('BUSD.address', BUSD.address);
  console.log('LotteryNFT.address', LotteryNFT.address);
  console.log('Lottery.address', Lottery.address);
  console.log('proxyAdmin', proxyAdmin);
  console.log('lotteryOwner', lotteryOwner);
  console.log('lotteryAdmin', lotteryAdmin);
  console.log('minPrice', minPrice);

  const abiEncodeData = web3.eth.abi.encodeFunctionCall({
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_busd",
        "type": "address"
      },
      {
        "internalType": "contract LotteryNFT",
        "name": "_lottery",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_minPrice",
        "type": "uint256"
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
  }, [BUSD.address, LotteryNFT.address, minPrice, '13', lotteryOwner, lotteryAdmin]);

  console.log('abiEncodeData', abiEncodeData);

  await deployer.deploy(LotteryUpgradeProxy, Lottery.address, proxyAdmin, abiEncodeData, { from: admin, gas: '5000000' });
  const lotteryNft = await LotteryNFT.deployed();
  await lotteryNft.transferOwnership(LotteryUpgradeProxy.address);
};
