const Lottery = require('../build/contracts/Lottery.json');
const Web3 = require('web3');
const fs = require('fs');
const { privateKeys } = JSON.parse(fs.readFileSync('../.secret').toString().trim());

const [_, alice] = privateKeys;

const contractAddress = '0x0D63dD9C049da06B09A7B3a9A1134679C6D53cdc'; // LotteryUpgradeProxy

require('console-stamp')(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
    stamp: 'green',
    label: 'white',
  }
});

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545'
  )
);

// console.log('Lottery.abi', Lottery.abi);

const LotteryContract = new web3.eth.Contract(Lottery.abi, contractAddress);

// console.log('lottery', lottery);


const enterDrawing = async (privateKey) => {
  console.log('Enter drawing phase...');
  const address = getUserAddress(privateKey);
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPriceWei = await web3.eth.getGasPrice();
  const data = LotteryContract.methods.enterDrawingPhase().encodeABI();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, privateKey);

  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('enterDrawing', result.transactionHash);
};

const drawing = async (privateKey) => {
  console.log('Drawing...');
  const address = getUserAddress(privateKey);
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPriceWei = await web3.eth.getGasPrice();
  const randomNumber = Math.floor((Math.random() * 10) + 1);
  const data = LotteryContract.methods.drawing(randomNumber).encodeABI();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, privateKey);

  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('drawing', result.transactionHash);
  const logs = web3.eth.abi.decodeLog([
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "issueIndex",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint8[4]",
      "name": "winningNumbers",
      "type": "uint8[4]"
    }
  ],
    result.logs[0].data,
    result.logs[0].topics[1] // indexed topic
  );
  console.log('issueIndex', logs.issueIndex);
  console.log('winningNumbers', logs.winningNumbers);
};

const reset = async (privateKey) => {
  console.log('Reset...');
  const address = getUserAddress(privateKey);
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPriceWei = await web3.eth.getGasPrice();
  const data = LotteryContract.methods.reset().encodeABI();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, privateKey);

  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('reset', result.transactionHash);
};

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getUserAddress(privateKey) {
  try {
    return web3.eth.accounts.privateKeyToAccount(privateKey).address;
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  while (1) {
    await sleep(10000);
    const time = Date.parse(new Date()) / 1000;
    if ((time - 240) % 300 < 18) { // draw every 5 minutes
      try {
        await reset(alice); // reset @ 17:14:02, 17:19:01
      }
      catch (err) {
        console.error(err);
      }
    }

    else if ((time - 180) % 300 < 18) {
      try {
        await enterDrawing(alice); // 17:18:09, 17:23.08
        await drawing(alice); // 17.18.21, 17:23:21
      }
      catch (err) {
        console.error(err);
      }
    }
  }
}

main();

