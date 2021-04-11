# token-lottery

- clone this repository `git clone https://github.com/nanmcpe/token-lottery`
- enter to directory `cd token-lottery`
- run `npm install`
- add secret file `vi .secret`

```
{
    "infuraProjectId": "",
    "privateKey": [
        "",
        "",
        "",
        ""
        ],
    "privateKeyGanache": [
        "",
        "",
        "",
        ""
        ],
    "etherApiKey": "",
    "bscApiKey": ""
}
```

- run `truffle compile`
- edit file `vi ./node_modules/request/request.js` on line 852, hard coded timeout to `120000`
- run `truffle migrate --network kovan`
- run `npm run verify BUSD --network kovan`
- run `npm run verify LotteryNFT --network kovan`
- run `npm run verify Lottery --network kovan`
- run `npm run verify LotteryUpgradeProxy --network kovan`