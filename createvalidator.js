const Web3 = require('web3');

const VALIDATORS = "0x000000000000000000000000000000000000F000";

const NETWORK_ID =  170;
const CHAIN_ID =  170;
const PROVIDER_URL =  "https://http-testnet.hoosmartchain.com";

const validators = [["0x4167d07ebae417245205834058d9c5883822f2af","privatekey"]]

const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));

let Validators = {};
let candidate = validators[0][0];
let proxy = validators[0];
instanceValidators();

let result;
async function createOrEditValidator() {
    let encodedabi = await Validators.methods.createOrEditValidator(candidate, "Road", "558665", "None", "sn4rkzen@gmail.com", "Road pool").encodeABI();
    await sendSignedTx(proxy[0], proxy[1], encodedabi, VALIDATORS);
}

(async function () {
await createOrEditValidator()
})();


var Tx = require('ethereumjs-tx').Transaction;
const ethereumjs_common = require('ethereumjs-common').default;

async function sendSignedTx(account, account_secrets, encodedabi, contract_address, isCreateProposalOption,msg_value) {
    console.log(account, encodedabi, contract_address)
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

function instanceValidators() {
    let abi = require("./abijsons/Validators.json").abi;
    Validators = new web3.eth.Contract(abi, VALIDATORS);
    if (undefined == Validators) {
        console.log("un");
        return;
    }
    // console.log(Validators.methods)
}
