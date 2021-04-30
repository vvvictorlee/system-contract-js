
const Web3 = require('web3');

const fs = require('fs');

const readJson = (fileName) => {
    return JSON.parse(fs.readFileSync(fileName));
}


const secrets = readJson('._');
// const password = "123456";
const VALIDATORS = "0x000000000000000000000000000000000000F000";
const PUNISH = "0x000000000000000000000000000000000000F001";
const PROPOSAL = "0x000000000000000000000000000000000000F002";

const NETWORK_ID = 170;
const CHAIN_ID = 170;
const PROVIDER_URL = 'http://127.0.0.1:8545';///'http://35.73.127.28::8645'; //



const validator1 = "0x598feab9ff6a090a7faa9df0f3b4df3f0c8d35fc";
const validator2 = "0xc49926c4124cee1cba0ea94ea31a6c12318df947";
const validator3 = "0x4a79c58ccf9d80353c02357f26d6f7b99fa9991e";
const validator4 = "0xc6af1e96cb0fe864ccfc1d1dcf4239a233a9b72a";
const validator5 = "0x649f3ace838d52b47ffe9fb1014f8489b1665481";




// const BN = require('BigNumber.js');
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
// // wei是以太坊上的的最小单位，ether小数点后18位为一个wei

let Proposal = {};
let abi = {};
let Punish = {};
let Validators = {};
let id = "0x90d99b1135c1beb013e7acf65c604e0562c5a6fb46daf9cd04355c2baa663a3e"


instanceValidators();

instancePunish();

instanceProposal();


let handlers = {
    "b": (async function () {
        await getBalance();
    }),
    "c": (async function () {
        await createProposal();
    }),
    "v": (async function () {
        await voteProposal();
    }),
 "p": (async function () {
        await proposals();
    }),
    "gv": (async function () {
        await getValidators();
    }),
    "default": (async function () {
        await usageFunc();
    })

};



// console.log(process.argv);
const f = handlers[process.argv[2]] || handlers["default"];
f();

async function usageFunc() {
    console.log("process.argv==", process.argv);
    let epochBlock = (await web3.eth.getBlock("latest"));
    console.log(epochBlock.number, epochBlock.timestamp);

}



function instanceProposal() {
    abi = require("./abijsons/Proposal.json").abi;
    Proposal = new web3.eth.Contract(abi, PROPOSAL);
    if (undefined == Proposal) {
        console.log("un");
        return;
    }
    // console.log(Proposal.methods)
}

function instancePunish() {
    let abi = require("./abijsons/Punish.json").abi;
    Punish = new web3.eth.Contract(abi, PUNISH);
    if (undefined == Punish) {
        console.log("un");
        return;
    }
    // console.log(Punish.methods)
}


function instanceValidators() {
    let abi = require("./abijsons/Validators.json").abi;
    Validators = new web3.eth.Contract(abi, VALIDATORS);
    if (undefined == Validators) {
        console.log("un");
        return;
    }
    // console.log(Validators.methods)
}



let result;

async function getBalance() {
    var balanceWei = await web3.eth.getBalance(validator3);//.then(console.log);//.toNumber();
    // // 从wei转换成ether
    var balance = web3.utils.fromWei(web3.utils.toBN(balanceWei), 'ether');
    console.log("===balnace====", balanceWei);
    console.log(balance);
}

async function createProposal() {
    // await Proposal.methods.createProposal(validator4, 'detail').send({ from: validator4 });
    let encodedabi = await Proposal.methods.createProposal(validator5, 'detail').encodeABI();
    await sendSignedTx(validator5, secrets[validator5], encodedabi, PROPOSAL);

}

async function voteProposal() {
    // await Proposal.methods.voteProposal(validator5, true).send({ from: validator3 });
    let encodedabi = await Proposal.methods.voteProposal(id, true).encodeABI();
    // await sendSignedTx(validator1, secrets[validator1], encodedabi, PROPOSAL);
    await sendSignedTx(validator2, secrets[validator2], encodedabi, PROPOSAL);
    // await sendSignedTx(validator3, secrets[validator3], encodedabi, PROPOSAL);


}

async function proposals() {
    // //step7
    // await web3.eth.personal.unlockAccount(validator3, password);
    result = await Proposal.methods.proposals(id).call({ from: validator3 });
    console.log("proposals('')==", result);
    // result = await Proposal.methods.votes('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', '0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validator3 });
    // console.log("votes('', '')==", result);

    // result = await Proposal.methods.pass('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validator3 });
    // console.log("pass('')==", result);

}

async function stake() {
    await Validators.methods.stake('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validator3 });
}
async function createOrEditValidator() {
    await Validators.methods.createOrEditValidator('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe', "moniker", "identity", "website", "email", "details").send({ from: validator3 });
    // // address payable feeAddr, moniker, identity, website, email, details
}

async function unstake() {
    await Validators.methods.unstake('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validator3 });
}
async function withdrawStaking() {
    await Validators.methods.withdrawStaking('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validator3 });
}
async function withdrawProfits() {
    await Validators.methods.withdrawProfits('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validator3 });
}

async function getValidators() {
    const vv = [];
    for (let v of vv) {
        result = await Validators.methods.getValidatorInfo(v).call({ from: validator3 });
        console.log(v, "getValidatorInfo==", result);

    }

    // result = await Validators.methods.staked('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', '0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validator3 });
    // console.log("staked", result);

    // result = await Validators.methods.operationsDone('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', 1).call({ from: validator3 });
    // console.log("operationsDone===", result);
    // for (let i = 0; i < 2; i++) {
    //     result = await Validators.methods.currentValidatorSet(i).call({ from: validator3 });
    //     console.log("currentValidatorSet==", result);
    //     // result = await Validators.methods.highestValidatorsSet(i).call({ from: validator3 });
    //     // console.log(result);
    // }
    // result = await Validators.methods.totalStake().call({ from: validator3 });
    // console.log("totalStake==", result);
    // result = await Validators.methods.totalJailedHB().call({ from: validator3 });
    // console.log("totalJailedHB==", result);
}
async function punish() {

    // result = await Punish.methods.punishValidators().call({ from: validator3 });
    // console.log(result);

    // result = await Punish.methods.punishRecords('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validator3 });
    // console.log(result);

    // result = await Punish.methods.punished(1).call({ from: validator3 });
    // console.log(result);

    // result = await Punish.methods.decreased(1).call({ from: validator3 });
    // console.log(result);

    result = await Punish.methods.punishThreshold().call({ from: validator3 });
    console.log(result);
    result = await Punish.methods.removeThreshold().call({ from: validator3 });
    console.log(result);
    result = await Punish.methods.decreaseRate().call({ from: validator3 });
    console.log(result);
}

(async function () {


})();


var Tx = require('ethereumjs-tx').Transaction;
const ethereumjs_common = require('ethereumjs-common').default;

// let encodedabi = await Proposal.methods.voteProposal('0x1b297ebe5720f9887b4302c56f932bc424920c2d707f5276cee99d0831651851', true).encodeABI();

async function sendSignedTx(account, account_secrets, encodedabi, contract_address) {
    console.log(account, account_secrets, encodedabi, contract_address, NETWORK_ID, CHAIN_ID)
    let nonce = await web3.eth.getTransactionCount(account, "pending");
    console.log("nonce==", nonce);
    var privateKey = Buffer.from(account_secrets, 'hex');
    const gasprice = await web3.eth.getGasPrice();
    console.log("gasprice==", gasprice);

    var rawTx = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasprice),
        gasLimit: web3.utils.toHex(3000000),
        from: account,
        to: contract_address,
        value: '0x00',
        data: encodedabi,
        chainId: CHAIN_ID
    }
    var common = ethereumjs_common.forCustomChain('ropsten', { networkId: NETWORK_ID, chainId: CHAIN_ID, name: 'geth' }, 'muirGlacier');
    var tx = new Tx(rawTx, { "common": common });
    tx.sign(privateKey);

    var serializedTx = tx.serialize();
    console.log("serializedTx==", serializedTx);

    let receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log(JSON.stringify(receipt))
}
// sendSignedTx();

