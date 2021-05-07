# system-contract-js
###### 示例文件
按私钥文件示例文件example._创建地址与私钥保存文件名._
 {"0x000000000":""}

###### createProposal
createProposal
返回receipt.logs.topics[1]  数组第二个元素是proposal id


###### createProposal


{
  "blockHash": "0x7467dd745bfcc9c0d2a114f0e5c43f2abc921855b0d238a97cd77d9516417001",
  "blockNumber": 39978,
  "contractAddress": null,
  "cumulativeGasUsed": 111972,
  "from": "0x649f3ace838d52b47ffe9fb1014f8489b1665481",
  "gasUsed": 111972,
  "logs": [
    {
      "address": "0x000000000000000000000000000000000000F002",
      "topics": [
        "0xc10f2f4d53a0e342536c6af3cce9c6ee25c32dbb323521ce0e1d4494a3e362e8",
        "0x90d99b1135c1beb013e7acf65c604e0562c5a6fb46daf9cd04355c2baa663a3e",
        "0x000000000000000000000000649f3ace838d52b47ffe9fb1014f8489b1665481",
        "0x000000000000000000000000649f3ace838d52b47ffe9fb1014f8489b1665481"
      ],
      "data": "0x00000000000000000000000000000000000000000000000000000000608b55d0",
      "blockNumber": 39978,
      "transactionHash": "0xfc81a88b3b4effbad779875a5ed479f58ae6fcc9ef4c229bc400ebe5ebfdc57c",
      "transactionIndex": 0,
      "blockHash": "0x7467dd745bfcc9c0d2a114f0e5c43f2abc921855b0d238a97cd77d9516417001",
      "logIndex": 0,
      "removed": false,
      "id": "log_bbabf5e1"
    }
  ],
  "logsBloom": "0x00000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000400000000000000000000100000000000000000000000000000000000000000000000000010000000000000000000000000000000000000200200000000000000400000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000004000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000010000000000",
  "status": true,
  "to": "0x000000000000000000000000000000000000f002",
  "transactionHash": "0xfc81a88b3b4effbad779875a5ed479f58ae6fcc9ef4c229bc400ebe5ebfdc57c",
  "transactionIndex": 0
}





==Examples==

|-|!coin |!account |!chain |!address |!path |
|-|Bitcoin|first|external|first|m / 44' / 0' / 0' / 0 / 0|
|-
|Bitcoin
|first
|external
|second
|m / 44' / 0' / 0' / 0 / 1
|-
|Bitcoin
|first
|change
|first
|m / 44' / 0' / 0' / 1 / 0
|-
|Bitcoin
|first
|change
|second
|m / 44' / 0' / 0' / 1 / 1
|-
|Bitcoin
|second
|external
|first
|m / 44' / 0' / 1' / 0 / 0
|-
|Bitcoin
|second
|external
|second
|m / 44' / 0' / 1' / 0 / 1
|-
|Bitcoin
|second
|change
|first
|m / 44' / 0' / 1' / 1 / 0
|-
|Bitcoin
|second
|change
|second
|m / 44' / 0' / 1' / 1 / 1
|-
|Bitcoin Testnet
|first
|external
|first
|m / 44' / 1' / 0' / 0 / 0
|-
|Bitcoin Testnet
|first
|external
|second
|m / 44' / 1' / 0' / 0 / 1
|-
|Bitcoin Testnet
|first
|change
|first
|m / 44' / 1' / 0' / 1 / 0
|-
|Bitcoin Testnet
|first
|change
|second
|m / 44' / 1' / 0' / 1 / 1
|-
|Bitcoin Testnet
|second
|external
|first
|m / 44' / 1' / 1' / 0 / 0
|-
|Bitcoin Testnet
|second
|external
|second
|m / 44' / 1' / 1' / 0 / 1
|-
|Bitcoin Testnet
|second
|change
|first
|m / 44' / 1' / 1' / 1 / 0
|-
|Bitcoin Testnet
|second
|change
|second
|m / 44' / 1' / 1' / 1 / 1
|
