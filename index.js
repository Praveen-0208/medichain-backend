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
const { addUser, login, getUser, getAllDetails } = require('./api/controllers/UserController')
const { encryptText, decryptText } = require('./lib/utils')

const ipfsHttpClient = require('ipfs-http-client');
const { addFile } = require('./api/controllers/ipfsController');
const { getFile, getTransactions } = require('./api/controllers/transactionController');
const ipfs = ipfsHttpClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
      return res.status(200).json(data ? data : 'connected successfully');
    })
    .catch(() => {
      return res.status(500).json({
        error: 'something went wrong',
      });
    });
});


app.post('/addUser', function (req, res) {
  const wallet = ethers.Wallet.createRandom()
  // console.log()
  // req.body.user['address'] = encryptText(wallet.address)
  // req.body.user['mnemonic'] = encryptText(wallet.mnemonic.phrase)
  // req.body.user['privateKey'] = encryptText(wallet.privateKey)
  console.log('\n\nuser', req.body)
  addUser(req, res)
})

app.post('/login', function (req, res) {
  // addUser(req, res)
  login(req, res)
})

app.post('/getUser', function (req, res) {
  // addUser(req, res)
  getUser(req, res)
})

app.post('/getAllDetails', function (req, res) {
  // addUser(req, res)
  getAllDetails(req, res)
})

//for blockchain
// app.get('/addfile', function (req, res) {

//   ipfs.files.add(testBuffer, function (err, file) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(file)
//   })

// })
//Getting the uploaded file via hash code.
app.post('/getReport', getFile)


app.post("/addFile", addFile)

app.get("/getLogs", getTransactions)

app.listen(9000, () => console.log('App listening on port 9000!'))