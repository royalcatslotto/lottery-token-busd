# token-lottery

# Current contract address
- BUSD: `0xC3D992c84aA12d1fB078f0a3c9470A4Ddc3e4A74`
- LotteryNFT: `0x411a6f3805dD17694fD287ADEc28D9Ce9de3789D`
- Lottery: `0xD778C0EC9362f6742F5490CdA76a349402715875`
- LotteryUpgradeProxy: `0x1859F1C7966147C4863190B98fa028b62AE96bdb` << FRONTEND USE THIS TO INTERACT

# Current User address
- Proxy admin: `0xad1F66Acea98733D63cd8FC522118e4014Cb3F79`
- Lottery owner: `0xa11cec4fF714C34775318544e97842344A9F3aDc`
- Lottery admin: `0xa11cec4fF714C34775318544e97842344A9F3aDc`

The BUSD Token has minted and transfer to Admin address (1000B BUSD)

# How to deploy
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