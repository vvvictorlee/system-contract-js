
const Web3 = require('web3');

const fs = require('fs');
require('dotenv').config();


// const readJson = (fileName) => {
//     return JSON.parse(fs.readFileSync(fileName));
// }
// const secrets = readJson('._');

// const dodo_names = (process.env.DODO_NAMES || "").split(",") || []
const secrets_pairs = process.env.SECRETS || []
const secrets = JSON.parse(secrets_pairs);


// const password = "123456";
const VALIDATORS = "0x000000000000000000000000000000000000F000";
const PUNISH = "0x000000000000000000000000000000000000F001";
const PROPOSAL = "0x000000000000000000000000000000000000F002";

const NETWORK_ID = process.env.CHAIN_ID || 170;
const CHAIN_ID = process.env.CHAIN_ID || 170;
const PROVIDER_URL = process.env.PROVIDER_URL || "";

const validators = secrets;//Object.keys(secrets);

// const BN = require('BigNumber.js');
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
// // wei是以太坊上的的最小单位，ether小数点后18位为一个wei

let Proposal = {};
let abi = {};
let Punish = {};
let Validators = {};
let id = "0x996cdc4aac6436a79269f68c55d10140518cbfddbf5c4cc85da1aff73f98b32f"//"0x9009add07ce140a49356f7592fb9d54a90e53c1315a18e9421e4fcc4ea509310";//"0x90d99b1135c1beb013e7acf65c604e0562c5a6fb46daf9cd04355c2baa663a3e"
let candidate = validators[5][0];
let proxy = validators[2];
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
    "cv": (async function () {
        await createOrEditValidator();
    }),
    "s": (async function () {
        await stake();
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
const f = handlers[process.argv[3]] || handlers["default"];
f();

async function usageFunc() {
    console.log("process.argv==", process.argv);
    let epochBlock = (await web3.eth.getBlock("latest"));
    console.log(epochBlock.number, epochBlock.timestamp);
    await getBlocks();

}


let result;

async function getBalance() {
    var balanceWei = await web3.eth.getBalance(validators[1][0]);//.then(console.log);//.toNumber();
    // // 从wei转换成ether
    var balance = web3.utils.fromWei(web3.utils.toBN(balanceWei), 'ether');
    console.log("===balnace====", balanceWei);
    console.log(balance);
}


async function getBlocks() {
    // const bn = 225319;
    // let count = await web3.eth.getBlockTransactionCount(bn)
    // console.log("count==", count)
    // for (let i = 0; i < count; i++) {
    //     let epochBlock = await web3.eth.getTransactionFromBlock(bn, i);
    //     console.log(epochBlock);
    // }


    // let tx = await web3.eth.getTransaction("0x1e51278956cd375e3e7b29932b1f38c5164b10cca87144507c4a972ed2c2e1a9");
    // console.log(tx);

    // let s = await web3.methods.debug_traceTransaction("0xf882b4fbda5af41705650c92c5832d9f734136456c15d5ea1ccb2cf15b4a2254")
    // console.log(s)
    // let code = await web3.eth.getCode("0x9F1739Dd75F1ed20880f27823e6d4EC99f640860");
    // console.log(code);

}

async function createProposal() {
    // await Proposal.methods.createProposal(validators[3][0], 'detail').send({ from: validators[3][0] });
    console.log(candidate)
    let encodedabi = await Proposal.methods.createProposal(candidate, 'road pool').encodeABI();
    await sendSignedTx(proxy[0], proxy[1], encodedabi, PROPOSAL, true);
}

async function voteProposal() {
    const vindex = 1;
    // await Proposal.methods.voteProposal(validators[4][0], true).send({ from: validators[1][0] });
    let encodedabi = await Proposal.methods.voteProposal(id, true).encodeABI();
    // await sendSignedTx(validator1, secrets[validator1], encodedabi, PROPOSAL);
    // console.log(validators)
    // await sendSignedTx(validators[1][0], JSON.stringify(validators[1][1]), encodedabi, PROPOSAL);
    await sendSignedTx(validators[vindex][0], validators[vindex][1], encodedabi, PROPOSAL);
}

async function proposals() {
    // //step7
    // await web3.eth.personal.unlockAccount(validators[1][0], password);
    result = await Proposal.methods.proposals(id).call({ from: validators[1][0] });
    console.log("proposals('')==", result);
    result = await Proposal.methods.votes(validators[1][0], id).call({ from: validators[1][0] });
    console.log("votes('', '')==", result);

    result = await Proposal.methods.pass(candidate).call({ from: validators[1][0] });
    console.log("pass('')==", result);

}

async function stake() {
    // await Validators.methods.stake(validators[4][0]).send({ from: validators[1][0] });
    let encodedabi = await Validators.methods.stake(candidate).encodeABI();
    await sendSignedTx(proxy[0], proxy[1], encodedabi, VALIDATORS,false,32);
}
async function createOrEditValidator() {
    // await Validators.methods.createOrEditValidator(candidate, "Road", "558665", "None", "sn4rkzen@gmail.com", "Road pool").send({ from: proxy });
    let encodedabi = await Validators.methods.createOrEditValidator(candidate, "Road", "558665", "None", "sn4rkzen@gmail.com", "Road pool").encodeABI();
    await sendSignedTx(proxy[0], proxy[1], encodedabi, VALIDATORS);
    // // address payable feeAddr, moniker, identity, website, email, details
    // payable address & feeAddress : 0x4167d07ebae417245205834058d9c5883822f2af
    // moniker : Road
    // identity: hoo's ID 558665
    // website : None
    // email   : sn4rkzen@gmail.com
    // details : Road pool
}

async function unstake() {
    await Validators.methods.unstake('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validators[1][0] });
}
async function withdrawStaking() {
    await Validators.methods.withdrawStaking('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validators[1][0] });
}
async function withdrawProfits() {
    await Validators.methods.withdrawProfits('0xfd49c8467fc8f2E115322b21CaE17559aEa07cBe').send({ from: validators[1][0] });
}

async function getValidators() {
    const vv = [candidate];
    for (let v of vv) {
        result = await Validators.methods.getValidatorInfo(v).call({ from: validators[1][0] });
        console.log(v, "getValidatorInfo==", result);

    }

    // result = await Validators.methods.staked('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', '0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validators[1][0] });
    // console.log("staked", result);

    // result = await Validators.methods.operationsDone('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe', 1).call({ from: validators[1][0] });
    // console.log("operationsDone===", result);
    // for (let i = 0; i < 2; i++) {
    //     result = await Validators.methods.currentValidatorSet(i).call({ from: validators[1][0] });
    //     console.log("currentValidatorSet==", result);
    //     // result = await Validators.methods.highestValidatorsSet(i).call({ from: validators[1][0] });
    //     // console.log(result);
    // }
    // result = await Validators.methods.totalStake().call({ from: validators[1][0] });
    // console.log("totalStake==", result);
    // result = await Validators.methods.totalJailedHB().call({ from: validators[1][0] });
    // console.log("totalJailedHB==", result);
}
async function punish() {

    // result = await Punish.methods.punishValidators().call({ from: validators[1][0] });
    // console.log(result);

    // result = await Punish.methods.punishRecords('0xad49c8467fc8f2E115322b21CaE17559aEa07cBe').call({ from: validators[1][0] });
    // console.log(result);

    // result = await Punish.methods.punished(1).call({ from: validators[1][0] });
    // console.log(result);

    // result = await Punish.methods.decreased(1).call({ from: validators[1][0] });
    // console.log(result);

    result = await Punish.methods.punishThreshold().call({ from: validators[1][0] });
    console.log(result);
    result = await Punish.methods.removeThreshold().call({ from: validators[1][0] });
    console.log(result);
    result = await Punish.methods.decreaseRate().call({ from: validators[1][0] });
    console.log(result);
}

(async function () {


})();


var Tx = require('ethereumjs-tx').Transaction;
const ethereumjs_common = require('ethereumjs-common').default;

// let encodedabi = await Proposal.methods.voteProposal('0x1b297ebe5720f9887b4302c56f932bc424920c2d707f5276cee99d0831651851', true).encodeABI();

async function sendSignedTx(account, account_secrets, encodedabi, contract_address, isCreateProposalOption,msg_value) {
    // console.log(account, encodedabi, contract_address)
    let isCreateProposal = isCreateProposalOption || false
    let value = msg_value||0
    let nonce = await web3.eth.getTransactionCount(account, "pending");
    var privateKey = Buffer.from(account_secrets, 'hex');

    const gasprice = await web3.eth.getGasPrice();

    var rawTx = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasprice),
        gasLimit: web3.utils.toHex(3000000),
        from: account,
        to: contract_address,
        value: web3.utils.toHex(value),
        data: encodedabi,
        chainId: web3.utils.toHex(170)
    }
    var common = ethereumjs_common.forCustomChain('ropsten', { networkId: web3.utils.toHex(NETWORK_ID), chainId: web3.utils.toHex(CHAIN_ID), name: 'geth' }, 'muirGlacier');
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
