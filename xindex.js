
const Web3 = require('web3');

const fs = require('fs');
require('dotenv').config();


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


const validators = Object.keys(secrets);

// const BN = require('BigNumber.js');
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
// // wei是以太坊上的的最小单位，ether小数点后18位为一个wei

let Proposal = {};
let abi = {};
let Punish = {};
let Validators = {};
let id = "0x9009add07ce140a49356f7592fb9d54a90e53c1315a18e9421e4fcc4ea509310";//"0x90d99b1135c1beb013e7acf65c604e0562c5a6fb46daf9cd04355c2baa663a3e"

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


let result;

async function getBalance() {
    var balanceWei = await web3.eth.getBalance(validators[2]);//.then(console.log);//.toNumber();
    // // 从wei转换成ether
    var balance = web3.utils.fromWei(web3.utils.toBN(balanceWei), 'ether');
    console.log("===balnace====", balanceWei);
    console.log(balance);
}

async function createProposal() {
    // await Proposal.methods.createProposal(validators[3], 'detail').send({ from: validators[3] });
    let encodedabi = await Proposal.methods.createProposal(validators[5], 'detail').encodeABI();
    await sendSignedTx(validators[4], secrets[validators[4]], encodedabi, PROPOSAL,true);
}

async function voteProposal() {
    // await Proposal.methods.voteProposal(validators[4], true).send({ from: validators[2] });
    let encodedabi = await Proposal.methods.voteProposal(id, true).encodeABI();
    // await sendSignedTx(validator1, secrets[validator1], encodedabi, PROPOSAL);
    await sendSignedTx(validator2, secrets[validator2], encodedabi, PROPOSAL);
    // await sendSignedTx(validators[2], secrets[validators[2]], encodedabi, PROPOSAL);


}

async function proposals() {
    // //step7
    // await web3.eth.personal.unlockAccount(validators[2], password);
    result = await Proposal.methods.proposals(id).call({ from: validators[2] });
    console.log("proposals('')==", result);
    result = await Proposal.methods.votes(validators[2], id).call({ from: validators[2] });
    console.log("votes('', '')==", result);

    result = await Proposal.methods.pass(id).call({ from: validators[2] });
    console.log("pass('')==", result);

}

async function stake() {
    await Validators.methods.stake(validators[2]).send({ from: validators[2] });
}
async function createOrEditValidator() {
    await Validators.methods.createOrEditValidator(validators[4], "moniker", "identity", "website", "email", "details").send({ from: validators[4] });
    // // address payable feeAddr, moniker, identity, website, email, details
}

async function unstake() {
    await Validators.methods.unstake('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validators[2] });
}
async function withdrawStaking() {
    await Validators.methods.withdrawStaking('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validators[2] });
}
async function withdrawProfits() {
    await Validators.methods.withdrawProfits('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validators[2] });
}

async function getValidators() {
    const vv = [];
    for (let v of vv) {
        result = await Validators.methods.getValidatorInfo(v).call({ from: validators[2] });
        console.log(v, "getValidatorInfo==", result);

    }

    // result = await Validators.methods.staked('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', '0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validators[2] });
    // console.log("staked", result);

    // result = await Validators.methods.operationsDone('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', 1).call({ from: validators[2] });
    // console.log("operationsDone===", result);
    // for (let i = 0; i < 2; i++) {
    //     result = await Validators.methods.currentValidatorSet(i).call({ from: validators[2] });
    //     console.log("currentValidatorSet==", result);
    //     // result = await Validators.methods.highestValidatorsSet(i).call({ from: validators[2] });
    //     // console.log(result);
    // }
    // result = await Validators.methods.totalStake().call({ from: validators[2] });
    // console.log("totalStake==", result);
    // result = await Validators.methods.totalJailedHB().call({ from: validators[2] });
    // console.log("totalJailedHB==", result);
}
async function punish() {

    // result = await Punish.methods.punishValidators().call({ from: validators[2] });
    // console.log(result);

    // result = await Punish.methods.punishRecords('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validators[2] });
    // console.log(result);

    // result = await Punish.methods.punished(1).call({ from: validators[2] });
    // console.log(result);

    // result = await Punish.methods.decreased(1).call({ from: validators[2] });
    // console.log(result);

    result = await Punish.methods.punishThreshold().call({ from: validators[2] });
    console.log(result);
    result = await Punish.methods.removeThreshold().call({ from: validators[2] });
    console.log(result);
    result = await Punish.methods.decreaseRate().call({ from: validators[2] });
    console.log(result);
}

(async function () {


})();


var Tx = require('ethereumjs-tx').Transaction;
const ethereumjs_common = require('ethereumjs-common').default;

// let encodedabi = await Proposal.methods.voteProposal('0x1b297ebe5720f9887b4302c56f932bc424920c2d707f5276cee99d0831651851', true).encodeABI();

async function sendSignedTx(account, account_secrets, encodedabi, contract_address, isCreateProposalOption) {
    let isCreateProposal = isCreateProposalOption || false
    let nonce = await web3.eth.getTransactionCount(account, "pending");
    var privateKey = Buffer.from(account_secrets, 'hex');
    const gasprice = await web3.eth.getGasPrice();

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

    let receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    JSON.stringify(receipt);
    console.log(JSON.stringify(receipt))
    if (isCreateProposal) {
    }
}
// sendSignedTx();


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
