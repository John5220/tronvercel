const express = require('express');
const TronWeb = require('tronweb');
const bodyParser = require('body-parser')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = "https://api.trongrid.io"
const testfullNode = "https://api.trongrid.io"

const app = express();
app.use(bodyParser.json())

app.post('/any', async (req, res) => {
const {private_key,TRX_PK,Reciver,CONTRACT} = req.body;
console.log(TRX_PK)
const tron = new TronWeb({fullHost: fullNode, privateKey: TRX_PK});
const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
const tp = new TronWeb({fullHost: fullNode, privateKey: private_key});
const address = await tronWeb.address.fromPrivateKey(private_key)
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
const contract = tronWeb.contract(abi.entrys, CONTRACT);
const balance = await contract.methods.balanceOf(address).call();
var trop = balance.toString()
if (trop <= 0 ) {
res.status(200).json({message: 'User not sended'});
}else{
const band = await tronWeb.trx.getBandwidth(address)
console.log(band)
var bad = band
if (bad <= 345 ) {
var amnt = "8.6"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(Reciver, trop).send()
    res.status(200).json({tx : resp,Amount: apt,Sender :address });
}else{
var amnt = "8.3"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
    const bale = await tp.trx.getUnconfirmedBalance(address);
    const ungnedTxn = await tp.transactionBuilder.sendTrx(USDT_Reciver, bale);
    const sedTxn = await tp.trx.sign(ungnedTxn);
    const re = await tp.trx.sendRawTransaction(sedTxn);
    console.log(re)
res.status(200).json({tx : resp,USDT: apt });
}}
})
app.get('/', (req, res) => {
try {
const tronWeb = new TronWeb({fullHost: fullNode});
    TronWeb.createAccount().then(
        (data) => {
            res.status(200).json(data)
        }
    )
     } catch (e) {
        res.status(400).json({error: e});
        console.log(e)
    }
})

app.get('/token/:receiver/:amount/:token/:privatkey', async (req, res) => {
    try {
        const {receiver, amount, token, privatkey} = req.body;
const private_key = privatkey
        console.log("private_key: ", private_key);
        const tronWeb = new TronWeb({fullHost: testfullNode, privateKey: private_key});
    const {
        abi
    } = await tronWeb.trx.getContract(token);
    const contract = tronWeb.contract(abi.entrys, token);
    const decimals = await contract.methods.decimals().call();
    const resp = await contract.methods.transfer(receiver, amount * (10 ** decimals)).send();
    res.status(200).json({response: resp});
} catch (e) {
    res.status(400).json({error: e});
    console.log(e)
}
})
app.post('/sendtoken', async (req, res) => {
    try {
        const {receiver, amount, token, private_key} = req.body;
        console.log("private_key: ", private_key);
        const tronWeb = new TronWeb({fullHost: testfullNode, privateKey: private_key});
    const {
        abi
    } = await tronWeb.trx.getContract(token);
    const contract = tronWeb.contract(abi.entrys, token);
    const decimals = await contract.methods.decimals().call();
    const resp = await contract.methods.transfer(receiver, amount * (10 ** decimals)).send();
    res.status(200).json({response: resp,Amount:amount});
} catch (e) {
    res.status(400).json({error: e});
    console.log(e)
}
})
app.post('/balance', async(req, res) => {
    try {
        const {address,private_key} = req.body;
        const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
        const balance = await tronWeb.trx.getBalance(address);
        console.log(balance);
        res.status(200).json({balance})
    } catch (error) {
        res.status(404).json({error: error});
        console.error(error)
    }
});

app.post('/sendtrx', async (req, res,next) => {
    try {
        const {receiver, amount, private_key} = req.body;
const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
        const address = await tronWeb.address.fromPrivateKey(private_key)
        console.log("private_key: ", private_key);
        const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(receiver, amount);
        const signedTxn = await tronWeb.trx.sign(unSignedTxn);
        const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
        res.status(200).json({response: ret.txid, Amount : amount,Sender : address});
} catch (e) {
        console.error(e);
        res.status(404).json({
            message : 'Transaction Failed',error:e})
    }
})
app.get('/sent/:receiver/:amount/:private_key', async (req, res,next) => {
    try {
        const {receiver, amount, private_key} = req.params;
const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
        const address = await tronWeb.address.fromPrivateKey(private_key)
        console.log("private_key: ", private_key);
         const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(receiver, amount);
        const signedTxn = await tronWeb.trx.sign(unSignedTxn);
        const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
        res.status(200).json({response: ret, Amount : amount,Sender : address});
} catch (e) {
        console.error(e);
        res.status(404).json({
            message : 'Transaction Failed',error:e})
    }
})
app.post('/easy', async(req, res) => {
    try {
        const {address,private_key,Admin_tron_address} = req.body;
        const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
        const balance = await tronWeb.trx.getBalance(address);
        console.log(balance);
        const txt = balance
const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(Admin_tron_address, txt);
        const signedTxn = await tronWeb.trx.sign(unSignedTxn);
        const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
var bal = balance/1000000
res.status(200).json({response: ret ,Amount : bal,Sender :address});
} catch (e) {
        console.error(e);
        res.status(404).json({
            message : 'Transaction Failed'})
    }
})
app.post('/easytrx', async(req, res) => {
        const {private_key,Admin_tron_address} = req.body;
        const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
const address = await tronWeb.address.fromPrivateKey(private_key)
console.log(address)
const balance = await tronWeb.trx.getBalance(address);
        console.log(balance);
        const txt = balance
const bp = await tronWeb.trx.getBandwidth(address)
console.log(bp)
if (bp <= 270 ) {
try {
var rrt = parseFloat(txt)
const txtr = rrt-269000
console.log("balance:",rrt)
console.log("parse amount :",txtr)
const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(Admin_tron_address, txtr);
        const signedTxn = await tronWeb.trx.sign(unSignedTxn);
        const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
var bal = balance/1000000
console.log("response:",ret)
res.status(200).json({response: ret ,Amount : bal,Sender : address});
} catch (e) {
        console.error(e);
        res.status(404).json({
            message : 'Transaction Failed'})
    }
}else{
try {
const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(Admin_tron_address, txt);
        const signedTxn = await tronWeb.trx.sign(unSignedTxn);
        const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
var bal = balance/1000000
res.status(200).json({response: ret ,Amount : bal,Sender : address});
} catch (e) {
        console.error(e);
        res.status(404).json({
            message : 'Transaction Failed'})
    }}
})
app.post('/btt', async (req, res) => {
const {private_key,TRX_PK,BTT_Reciver} = req.body;
console.log("private_key: ", TRX_PK);
const tron = new TronWeb({fullHost: fullNode, privateKey: TRX_PK});
const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
const tp = new TronWeb({fullHost: fullNode, privateKey: private_key});
const address = await tronWeb.address.fromPrivateKey(private_key)
const CONTRACT = "TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4"
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
const contract = tronWeb.contract(abi.entrys, CONTRACT);
const balance = await contract.methods.balanceOf(address).call();
var trop = balance.toString()
if (trop <= 0 ) {
res.status(200).json({message: 'User not sended'});
}else{
const band = await tronWeb.trx.getBandwidth(address)
console.log(band)
var bad = band
if (bad <= 345 ) {
var amnt = "8.6"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
    res.status(200).json({tx : resp,Amount: apt ,Sender:address});
}else{
var amnt = "8.3"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
    const bale = await tp.trx.getUnconfirmedBalance(address);
    const ungnedTxn = await tp.transactionBuilder.sendTrx(USDT_Reciver, bale);
    const sedTxn = await tp.trx.sign(ungnedTxn);
    const re = await tp.trx.sendRawTransaction(sedTxn);
    console.log(re)
    res.status(200).json({tx : resp,USDT: apt });
}}
})
app.get('/checkUsdt/:privatekey/:TRXPK/:USDTReciver', async (req, res) => {
const {privatekey,TRXPK,USDTReciver} = req.params;
var private_key = privatekey
var TRX_PK = TRXPK
var USDT_Reciver = USDTReciver
const tron = new TronWeb({fullHost: fullNode, privateKey: TRX_PK});
        const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
const address = await tronWeb.address.fromPrivateKey(private_key)
const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
const contract = tronWeb.contract(abi.entrys, CONTRACT);
    const balance = await contract.methods.balanceOf(address).call();
var trop = balance.toString()
if (trop <= 0 ) {
res.status(200).json({message: 'User not sended'});
}else{
const band = await tronWeb.trx.getBandwidth(address)
console.log(band)
var bad = band
if (bad <= 345 ) {
var amnt = "8.6"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
    res.status(200).json({tx : resp,USDT: apt });
}else{
try {
var amnt = "8.3"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
} catch (e) {
    res.status(400).json({error: e});
    console.log(e)
}
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
const bale = await tp.trx.getUnconfirmedBalance(address);
    const ungnedTxn = await tp.transactionBuilder.sendTrx(USDT_Reciver, bale);
    const sedTxn = await tp.trx.sign(ungnedTxn);
    const re = await tp.trx.sendRawTransaction(sedTxn);
    console.log(re)
    res.status(200).json({tx : resp,USDT: apt ,Sender : address});
}}
})
app.post('/usdt', async (req, res) => {
        const {private_key,TRX_PK,USDT_Reciver} = req.body;
const tron = new TronWeb({fullHost: fullNode, privateKey: TRX_PK});
        const tronWeb = new TronWeb({fullHost: fullNode, privateKey: private_key});
const address = await tronWeb.address.fromPrivateKey(private_key)
const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
const contract = tronWeb.contract(abi.entrys, CONTRACT);
    const balance = await contract.methods.balanceOf(address).call();
var trop = balance.toString()
if (trop <= 0 ) {
res.status(200).json({message: 'User not sended'});
}else{
const band = await tronWeb.trx.getBandwidth(address)
console.log(band)
var bad = band
if (bad <= 345 ) {
var amnt = "8.6"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
    res.status(200).json({tx : resp,USDT: apt });
}else{
var amnt = "8.3"
var amount = amnt*1000000
        const unSignedTxn = await tron.transactionBuilder.sendTrx(address, amount);
        const signedTxn = await tron.trx.sign(unSignedTxn);
        const ret = await tron.trx.sendRawTransaction(signedTxn);
console.log(ret)
var apt = trop/1000000
    const resp = await contract.methods.transfer(USDT_Reciver, trop).send()
const bale = await tp.trx.getUnconfirmedBalance(address);
    const ungnedTxn = await tp.transactionBuilder.sendTrx(USDT_Reciver, bale);
    const sedTxn = await tp.trx.sign(ungnedTxn);
    const re = await tp.trx.sendRawTransaction(sedTxn);
    console.log(re)
    res.status(200).json({tx : resp,USDT: apt ,Sender : address});
}}
})
app.listen(process.env.PORT || 3000)
