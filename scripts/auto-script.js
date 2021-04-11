const Lottery = require('../build/contracts/Lottery.json');
const Web3 = require('web3');
const fs = require('fs');
const { privateKeys } = JSON.parse(fs.readFileSync('../.secret').toString().trim());

const [admin, alice, bob] = privateKeys;

const fromAddress = '0xad1F66Acea98733D63cd8FC522118e4014Cb3F79'; // LotteryAdmin
const toAddress = '0x0D63dD9C049da06B09A7B3a9A1134679C6D53cdc'; // LotteryUpgradeProxy

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545'
  )
);

console.log('Lottery.abi', Lottery.abi);

const lottery = new web3.eth.Contract(Lottery.abi, toAddress);

console.log('lottery', lottery);


const enterDrawing = async (privateKey) => {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPriceWei = await web3.eth.getGasPrice();
  const data = lottery.methods.enterDrawingPhase().encodeABI();
  // console.log('privateKey', privateKey);
  const signedTx = await web3.eth.accounts.signTransaction({
    to: toAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, privateKey);

  await web3.eth.sendSignedTransaction(signedTx.rawTransaction || signedTx.rawTransaction);

};

const drawing = async (privateKey) => {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPriceWei = await web3.eth.getGasPrice();
  const randomNumber = Math.floor((Math.random() * 10) + 1);
  const data = lottery.methods.drawing(randomNumber).encodeABI();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: toAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, privateKey);

  await web3.eth.sendSignedTransaction(signedTx.rawTransaction || signedTx.rawTransaction);
};

const reset = async (privateKey) => {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPriceWei = await web3.eth.getGasPrice();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: toAddress,
    gas: 2000000,
    data: '0xd826f88f',
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, privateKey);
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction || signedTx.rawTransaction);
};

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function main() {
  // // await enterDrawing(privateKey[1]);
  // await drawing(privateKey[1]);
  // // await reset(privateKey[1]); // => onsale
  // while (1) {
  //   await sleep(10000);
  //   const time = Date.parse(new Date()) / 1000;

  //   if ((time - 240) % 300 < 18) { // draw every 5 minutes
  //     try {
  //       console.log('reset'); // reset at 4 minute
  //       await reset();
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   else if ((time - 180) % 300 < 18) {
  //     try {
  //       console.log('drawing'); // drawing at 3 minute
  //       await enterDrawing();
  //       await drawing();
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
}

main();

