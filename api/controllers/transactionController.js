const Web3 = require("web3");
const ethers = require("ethers")
const constants = require("../../lib/constants");
const NFT = require('../../artifacts/contracts/MintNFT.sol/MintNFT.json');


exports.getFile = async (req, res) => {
    const {from, to, role} = req.body;
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(constants.MINTNFT_NFT_CONTRACT_ADDRESS,NFT.abi, signer)
    // console.log("contract", contract)
    let transaction = await contract.shareToken(from, to, role)
    let tx = await transaction.wait()
    
    const result = await contract.getTokens(from);

    if(result){
        return res.status(200).json({
            result
         })
    }

    return res.status(404).json({
        message: "No data found"
     })
}


exports.getTransactions = async (req, res) => {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))
    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(constants.MINTNFT_NFT_CONTRACT_ADDRESS,NFT.abi, signer)
    const myAddress = await signer.getAddress();

    const filterFrom = contract.filters.StoreMySharingData(myAddress, null);

    return res.status(200).json({
        filterFrom
    })
}