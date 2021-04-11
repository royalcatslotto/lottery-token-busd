# token-lottery

# Current contract address
## Kovan
- BUSD: `0xC3D992c84aA12d1fB078f0a3c9470A4Ddc3e4A74`
- LotteryNFT: `0x411a6f3805dD17694fD287ADEc28D9Ce9de3789D`
- Lottery: `0xD778C0EC9362f6742F5490CdA76a349402715875`
- LotteryUpgradeProxy: `0x1859F1C7966147C4863190B98fa028b62AE96bdb` << FRONTEND USE THIS TO INTERACT

## Binance Testnet
- BUSD: `0x322E4612792dcDD60A50f9802C823e7B51eF1e31`
- LotteryNFT: `0xDDd7dFFfCD69969F058322b22296CE3Fe65c0E7B`
- Lottery: `0x0f1Bc9EF868b577cEd418Ac90C9e70dF4B364b58`
- LotteryUpgradeProxy: `0x0D63dD9C049da06B09A7B3a9A1134679C6D53cdc` << FRONTEND USE THIS TO INTERACT

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

For Kovan
- run `truffle migrate --network kovan`
- run `npm run verify BUSD --network kovan`
- run `npm run verify LotteryNFT --network kovan`
- run `npm run verify Lottery --network kovan`
- run `npm run verify LotteryUpgradeProxy --network kovan`

For Binance Testnet
- run `truffle migrate --network binanceTestnet`
- run `npm run verify BUSD --network binanceTestnet`
- run `npm run verify LotteryNFT --network binanceTestnet`
- run `npm run verify Lottery --network binanceTestnet`
- run `npm run verify LotteryUpgradeProxy --network binanceTestnet`

# Miscellaneous
abiEncodeData: `0x11e42065000000000000000000000000322e4612792dcdd60a50f9802c823e7b51ef1e31000000000000000000000000ddd7dfffcd69969f058322b22296ce3fe65c0e7b0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000a11cec4ff714c34775318544e97842344a9f3adc000000000000000000000000a11cec4ff714c34775318544e97842344a9f3adc`

