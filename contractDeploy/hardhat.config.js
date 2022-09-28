require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('@nomiclabs/hardhat-ethers');
const dotenv=require('dotenv');
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url:process.env.RINKEBY_RPC_URL,
      accounts:[process.env.PRIVATE_WALLET_KEY]
    }
  },
  etherscan:{
    apiKey:process.env.ETHERSCAN_API_KEY
  }
};
