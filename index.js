//Required modules
const express = require('express');
const fs = require('fs');
const ethers = require('ethers')
const { USERCONTRACT_ADDRESS, USERCONTRACT_ABI } = require("./lib/constants");

require('dotenv').config();

const app = express();
const cookieparser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { addUser, login, getUser } = require('./api/controllers/UserController')
const { encryptText, decryptText } = require('./lib/utils')

const ipfsHttpClient = require('ipfs-http-client');
const { addFile } = require('./api/controllers/ipfsController');
const ipfs = ipfsHttpClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

//middlewares
app.use(express.json());
app.use(cookieparser());
app.use(cors());

//database connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DATABASE CONNECTION SUCCESSFUL');
  })
  .catch((error) => {
    console.log('DATABASE CONNECTION ERROR');
    console.log(error);
  });

const dbConnection = mongoose.connection;

// test route
app.get('/', (req, res) => {
  dbConnection
    .collection('demo')
    .findOne({ type: 'DB_TEST_DATA' })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch(() => {
      return res.status(500).json({
        error: 'something went wrong',
      });
    });
});

// app.post('/addUser', (req, res) => {

// });
app.post('/addUser', function (req, res) {
  const wallet = ethers.Wallet.createRandom()
  req.body.user['address'] = encryptText(wallet.address)
  req.body.user['mnemonic'] = encryptText(wallet.mnemonic.phrase)
  req.body.user['privateKey'] = encryptText(wallet.privateKey)
  addUser(req, res)
})

app.post('/login', function (req, res) {
  // addUser(req, res)
  login(req, res)
})

app.get('/getUser/:address', function (req, res) {
  // addUser(req, res)
  getUser(req, res)
})

//for blockchain
app.get('/addfile', function (req, res) {

  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file)
  })

})
//Getting the uploaded file via hash code.
app.get('/getfile', function (req, res) {

  //This hash is returned hash of addFile router.
  const validCID = 'HASH_CODE'

  ipfs.files.get(validCID, function (err, files) {
    files.forEach((file) => {
      console.log(file.path)
      console.log(file.content.toString('utf8'))
    })
  })
})

app.post("/addFile", addFile)

// app.post('/addUser', async function (req, res) {

//   const provider = ethers.getDefaultProvider(process.env.GANACHE_URL, {
//     // chainId: 4,
//     name: process.env.DEFAULT_NETWORK,
//   })

//   const walletWithProvider = new ethers.Wallet(
//     // process.env.GANACHE_PRIVATE_KEY,
//     '54585685ffe99b7ad091589ee73a10a42274a7766d071cdd42e1bc55baf55925',
//     provider,
//   )

//   const contract = new ethers.Contract(
//     USERCONTRACT_ADDRESS,
//     USERCONTRACT_ABI,
//     walletWithProvider,
//   )

//   const tx = await contract.addUser('0x452cD9df789D706f01b0DD5835a081d0E92825F1', 'abc', 'abc')
//   res.send(tx)
// })

app.listen(9000, () => console.log('App listening on port 9000!'))