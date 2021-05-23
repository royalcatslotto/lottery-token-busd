# token-lottery

# Current contract address
## Kovan
- BUSD: [0xC3D992c84aA12d1fB078f0a3c9470A4Ddc3e4A74](https://kovan.etherscan.io/address/0xC3D992c84aA12d1fB078f0a3c9470A4Ddc3e4A74#code)
- LotteryNFT: [0x411a6f3805dD17694fD287ADEc28D9Ce9de3789D](https://kovan.etherscan.io/address/0x411a6f3805dD17694fD287ADEc28D9Ce9de3789D#code)
- Lottery: [0xD778C0EC9362f6742F5490CdA76a349402715875](https://kovan.etherscan.io/address/0xD778C0EC9362f6742F5490CdA76a349402715875#code)
- LotteryUpgradeProxy: [0x1859F1C7966147C4863190B98fa028b62AE96bdb](https://kovan.etherscan.io/address/0x1859F1C7966147C4863190B98fa028b62AE96bdb#code)

## Binance Testnet
- BUSD: [0x322E4612792dcDD60A50f9802C823e7B51eF1e31](https://testnet.bscscan.com/address/0x322E4612792dcDD60A50f9802C823e7B51eF1e31#code)
- LotteryNFT: [0xDDd7dFFfCD69969F058322b22296CE3Fe65c0E7B](https://testnet.bscscan.com/address/0xDDd7dFFfCD69969F058322b22296CE3Fe65c0E7B#code)
- Lottery: [0xE7dD3497e439438a1f15BD65BB02c4791E0682ba](https://testnet.bscscan.com/address/0xE7dD3497e439438a1f15BD65BB02c4791E0682ba#code)
- LotteryUpgradeProxy: [0x0D63dD9C049da06B09A7B3a9A1134679C6D53cdc](https://testnet.bscscan.com/address/0x0D63dD9C049da06B09A7B3a9A1134679C6D53cdc#code)

## Binance Mainnet
- BUSD: [0xe9e7cea3dedca5984780bafc599bd69add087d56](https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56#code)
- LotteryNFT: [0x1e2bAf64F630DC482086Fa12Fe541a43c624074a](https://bscscan.com/address/0x1e2bAf64F630DC482086Fa12Fe541a43c624074a#code)
- Lottery: [0xfCC92421f5f59f1473657584E63bBeaf405cd8D3](https://bscscan.com/address/0xfCC92421f5f59f1473657584E63bBeaf405cd8D3#code)
- LotteryUpgradeProxy: [0x9236020Ea390A8822d8E55d563CB8A7E2B730e60](https://bscscan.com/address/0x9236020Ea390A8822d8E55d563CB8A7E2B730e60#code)

## Bitkub Chain Mainnet
- WKUB: [0xDa91a1aee4d7829c118cD6218CDA2cB2C56dd010](https://bkcscan.com/tokens/0xDa91a1aee4d7829c118cD6218CDA2cB2C56dd010/token-transfers)
- LotteryNFT: [0xfCC92421f5f59f1473657584E63bBeaf405cd8D3]
- Lottery: [0x9236020Ea390A8822d8E55d563CB8A7E2B730e60]
- LotteryUpgradeProxy: [0x130fddDD211744699F1083f815d83f7cc1Fe93F9]
- LotteryReferral: [0xE1fcB6bB08ee04fDe041c1b50f0B52cFb2a7b465]

# Current User address (testnet)
- Proxy admin: `0xad1F66Acea98733D63cd8FC522118e4014Cb3F79`
- Lottery owner: `0xa11cec4fF714C34775318544e97842344A9F3aDc`
- Lottery admin: `0xa11cec4fF714C34775318544e97842344A9F3aDc`

# Current User address (mainnet)
- Proxy admin: `0xca0272Aaa436E53a6Cc755454812d5A802bBFCE6`
- Lottery owner: `0xca1cca8f5637c9566d8C719C899440A88AF7D874`
- Lottery admin: `0xca1cca8f5637c9566d8C719C899440A88AF7D874`

The BUSD Token has minted and transfer to Admin address (1000B BUSD)

# How to deploy
- clone this repository `git clone https://github.com/nanmcpe/token-lottery`
- enter to directory `cd token-lottery`
- run `npm install`
- add secret file `vi .secret`

```
{
    "infuraProjectId": "",
    "privateKeys": [
        "",
        "",
        "",
        ""
        ],
    "privateKeysGanache": [
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
- verify proxy: go to [https://kovan.etherscan.io/proxyContractChecker](https://kovan.etherscan.io/proxyContractChecker) and enter `LotteryUpgradeProxy` address

For Binance Testnet
- run `truffle migrate --network binanceTestnet`
- run `npm run verify BUSD --network binanceTestnet`
- run `npm run verify LotteryNFT --network binanceTestnet`
- run `npm run verify Lottery --network binanceTestnet`
- run `npm run verify LotteryUpgradeProxy --network binanceTestnet`
- verify proxy: go to [https://testnet.bscscan.com/proxyContractChecker](https://testnet.bscscan.com/proxyContractChecker) and enter `LotteryUpgradeProxy` address

### Miscellaneous
ABI Encoded Data for deploying proxy: `0x11e42065000000000000000000000000322e4612792dcdd60a50f9802c823e7b51ef1e31000000000000000000000000ddd7dfffcd69969f058322b22296ce3fe65c0e7b0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000a11cec4ff714c34775318544e97842344a9f3adc000000000000000000000000a11cec4ff714c34775318544e97842344a9f3adc`

ABI Encoded Constructor Arguments for verify contract on both etherscan and bscscan (not necessary if using truffle run verify)
`000000000000000000000000d778c0ec9362f6742f5490cda76a349402715875000000000000000000000000ad1f66acea98733d63cd8fc522118e4014cb3f79000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c411e42065000000000000000000000000c3d992c84aa12d1fb078f0a3c9470a4ddc3e4a74000000000000000000000000411a6f3805dd17694fd287adec28d9ce9de3789d0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000a11cec4ff714c34775318544e97842344a9f3adc000000000000000000000000a11cec4ff714c34775318544e97842344a9f3adc00000000000000000000000000000000000000000000000000000000`

Tools: https://abi.hashex.org/
