//Required modules
const express = require('express');
const fs = require('fs');
const ethers = require('ethers')
const { USERCONTRACT_ADDRESS, USERCONTRACT_ABI } = require("./lib/constants");



const app = express();

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

app.post('/addUser', async function (req, res) {

  const provider = ethers.getDefaultProvider(process.env.GANACHE_URL, {
    // chainId: 4,
    name: process.env.DEFAULT_NETWORK,
  })

  const walletWithProvider = new ethers.Wallet(
    // process.env.GANACHE_PRIVATE_KEY,
    '54585685ffe99b7ad091589ee73a10a42274a7766d071cdd42e1bc55baf55925',
    provider,
  )

  const contract = new ethers.Contract(
    USERCONTRACT_ADDRESS,
    USERCONTRACT_ABI,
    walletWithProvider,
  )

  const tx = await contract.addUser('0x452cD9df789D706f01b0DD5835a081d0E92825F1', 'abc', 'abc')
  res.send(tx)


})

app.listen(9000, () => console.log('App listening on port 9000!'))