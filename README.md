# MediChain - Blockchain application to store your health records safely

This projects aims to store all the medical data of patients in a decentralized, secure and transparent way.

# Idea
Currently patients have to carry the hardcopies of their medical data whenever they need to visit the doctor. In emergency situations, treatment may be delayed when the patient doesn't have the medical records to understand their medical history and without any other option left,they will have to take up redundant scans.

If the medical data of the patient is stored in a decentralized storage where they have complete control over their data,this can be prevented. And in this secure and transparent environment, they can ensure that their data is not being misused.
NFT is used to track how the medical records are being shared in addition to who shared and who viewed it.

# Features

- Each user would be assigned one of 2 roles - doctor or patient- which decides the operations they can perform in the blockchain
- Doctor can view any patient's medical record and add a new medical record to the chain by logging into the system
- Patient can view only his own record and share his health record(NFT) with a doctor
- Each health record is a NFT which can be shared by the patient with a doctor to get his consultation
- When a doctor views a patient's health record this event is logged into the blockchain. This ensures transaparency.

# Tech-stack
- Express (backend framework)
- Node.js (javascript runtime)
- Ganache (Ethereum blockchain for development)
- Metamask (Etherum wallet to perform transaction)
- ether.js and web3.js (javascript library to talk over Ethereum node)
- Mongodb  (database to store off-chain data)
- Solidity (to write smart contract)
- hardhat (ethereum development environment)

# Project setup 

1. Clone the repo
2. Run ```npm install```  to install dependencies
3. Run ```npx hardhat compile``` to compile the smart contract
4. Run ```npx hardhat run scripts\sample-script.js``` to deploy the smart contracts.
5. Replace with proper ganache configurations in ```.env```
6. Replace with proper smart contract address in ```lib\constants.js``` 
7. Run ```npm start```
8. Application starts listening to ```port:9000```


