// Third-party
const fs = require('fs');
const Web3 = require('web3');
const schedule = require('node-schedule');

const Lottery = require('../build/contracts/Lottery.json');
const { privateKeys } = JSON.parse(fs.readFileSync('../.secret').toString().trim());
const { mainnetPrivateKeys } = JSON.parse(fs.readFileSync('../.secret').toString().trim());
// const CHAIN_ID = 56; // mainnet
const CHAIN_ID = 96; // BKC mainnet
const contractAddress = '0x130fddDD211744699F1083f815d83f7cc1Fe93F9'; // LotteryUpgradeProxy

const BN = Web3.utils.BN;
const [_, alice] = privateKeys;

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
// const web3 = new Web3(
//   new Web3.providers.HttpProvider(
//     'https://bsc-dataseed.binance.org'
//   )
// );

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
    chainId: CHAIN_ID,
  }, privateKey);

  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('enterDrawing', result.transactionHash);
};

const drawing = async (privateKey) => {
  console.log('Drawing...');
  const address = getUserAddress(privateKey);
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPriceWei = await web3.eth.getGasPrice();
  const randomHex = Web3.utils.randomHex(32).substr(2);
  const randomNumber = new BN(randomHex, 16).toString();
  const data = LotteryContract.methods.drawing(randomNumber).encodeABI();
  const signedTx = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    gas: 2000000,
    data: data,
    gasPrice: gasPriceWei,
    nonce: nonce,
    chainId: CHAIN_ID,
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
    chainId: CHAIN_ID,
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

// const DRAWING_SCHEDULE = [2, 14] // run every 9.00 am, 9.00 pm (GMT+7 time)
// const drawingRule = new schedule.RecurrenceRule();
// drawingRule.hour = DRAWING_SCHEDULE;
// drawingRule.minute = 0;
// drawingRule.tz = 'Etc/UTC';

// const RESET_SCHEDULE = [3, 15] // run every 10.00 am, 10.00 pm (GMT+7 time)
// const resetRule = new schedule.RecurrenceRule();
// resetRule.hour = RESET_SCHEDULE;
// resetRule.minute = 0;
// resetRule.tz = 'Etc/UTC';

const DRAWING_SCHEDULE = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
const DRAWING_SCHEDULE_MIN = [10,25,40,55]; 
const RESET_SCHEDULE_MIN = [0,15,30,45]; 
const drawingRule = new schedule.RecurrenceRule();
drawingRule.hour = DRAWING_SCHEDULE;
drawingRule.minute = DRAWING_SCHEDULE_MIN;
drawingRule.tz = 'Etc/UTC';

const resetRule = new schedule.RecurrenceRule();
resetRule.hour = DRAWING_SCHEDULE;
resetRule.minute = RESET_SCHEDULE_MIN;
resetRule.tz = 'Etc/UTC';

async function main_test() {
  while (1) {
    await sleep(10000);
    const time = Date.parse(new Date()) / 1000;
    if ((time - 240) % 300 < 18) { // draw every 5 minutes
      try {
        await reset(alice); // reset @ 17:14:02, 17:19:01, 17:24:01, 17:29:02
      }
      catch (err) {
        console.error(err);
      }
    }

    else if ((time - 180) % 300 < 18) {
      try {
        await enterDrawing(alice); // 17:18:09, 17:23.08, 17:28:09
        await drawing(alice); // 17.18.21, 17:23:21, 18:28:22
      }
      catch (err) {
        console.error(err);
      }
    }
  }
}

async function main() {
  console.log('Scheduler starting')

  // Drawing schedule
  const drawingJob = schedule.scheduleJob(drawingRule, async () => {
    const datetime = new Date().toISOString()
    console.log(`Scheduler drawing job: ${datetime}`)

    // [TODO] 
    //  1. handler error when state is drawed
    //  2. notify Slack/Line/Telegram when error
    try {
      await enterDrawing(alice);
      await drawing(alice);
    }
    catch (err) {
      console.error(err);
    }
  });

  // Reset schedule
  const resetStateJob = schedule.scheduleJob(resetRule, async () => {
    const datetime = new Date().toISOString()
    console.log(`Scheduler reset job: ${datetime}`)

    try {
      await reset(alice);
    }
    catch (err) {
      console.error(err);
    }
  })

  
}

//main();
main_test();

