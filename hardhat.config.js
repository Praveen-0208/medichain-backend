require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3")
require("@nomiclabs/hardhat-ethers");

require('dotenv').config({path: ".env"})


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: process.env.DEFAULT_NETWORK !== undefined ? process.env.DEFAULT_NETWORK : 'ropsten',
  networks: {
    ganache: {
      url: process.env.GANACHE_URL || "",
      accounts: process.env.GANACHE_PRIVATE_KEY !== undefined ?
        [process.env.GANACHE_PRIVATE_KEY] : [],
    },
  },
};
