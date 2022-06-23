const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const Web3Modal = require('web3modal')
const Web3 = require("web3");
const { IncomingForm } = require('formidable')
const ethers = require("ethers")
const fs = require("fs");

const NFT = require('../../artifacts/contracts/MintNFT.sol/MintNFT.json');
const constants = require('../../lib/constants');

exports.addFile = async (req, res) => {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
  const provider = new ethers.providers.Web3Provider(web3.currentProvider)

  const signer = provider.getSigner()

  const form = new IncomingForm({
    keepExtensions: true
  })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        error: 'something went wrong'
      })
    }
    const newSigner = new ethers.Wallet(fields.ownerKey, provider)
    if (files.report) {
      const testBuffer = fs.readFileSync(files.report.path);

      const ipfsFile = { path: files.report.path, content: testBuffer }
      ipfs.add(testBuffer).then(async (result) => {

        // let contract = new ethers.Contract(constants.MINTNFT_NFT_CONTRACT_ADDRESS, NFT.abi, signer)
        let contract = new ethers.Contract(constants.MINTNFT_NFT_CONTRACT_ADDRESS, NFT.abi, newSigner)
        console.log('\n\n\n\n\ncontract', contract)
        let transaction = await contract.createToken(result.path, { from: fields.ownerAddress }) // hard coded value. replace with file hash from ipfs
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        return res.status(200).json({ message: "file added successfully. token id is " + tokenId + " and price is " + transaction.gasPrice, path: result.path, token: tokenId })
        // return res.status(200).json({ message: "success " + result.path })

      })
    } else {
      return res.status(400).json({
        message: "No file uploaded"
      })
    }
  });
}