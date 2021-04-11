const lotteryAbi = require('./lottery.json');
const Web3 = require('web3');
const fs = require('fs');
const { alicePrivKey, bobPrivKey } = JSON.parse(fs.readFileSync('../.secret').toString().trim());
let { infuraProjectId, privateKey, privateKeyGanache } = JSON.parse(fs.readFileSync('../.secret').toString().trim());

const fromAddress = '0xa11cec4fF714C34775318544e97842344A9F3aDc'; // LotteryAdmin
const toAddress = '0x7c91f0d2F81d8518e6aDDeB93dE23A7cbD99F0D1'; // LotteryUpgradeProxy

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545'
  )
);

const lottery = new web3.eth.Contract(lotteryAbi, toAddress);

const enterDrawing = async (alicePrivKey) => {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPriceWei = await web3.eth.getGasPrice();
  const data = lottery.methods.enterDrawingPhase().encodeABI();
  // console.log('alicePrivKey', alicePrivKey);
  const signedTx = await web3.eth.accounts.signTransaction({
    to: toAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, alicePrivKey);

  await web3.eth.sendSignedTransaction(signedTx.rawTransaction || signedTx.rawTransaction);

};

const drawing = async (alicePrivKey) => {
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
  }, alicePrivKey);

  await web3.eth.sendSignedTransaction(signedTx.rawTransaction || signedTx.rawTransaction);
};

const reset = async (alicePrivKey) => {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  const gasPriceWei = await web3.eth.getGasPrice();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: toAddress,
    gas: 2000000,
    data: '0xd826f88f',
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: 97,
  }, alicePrivKey);
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

