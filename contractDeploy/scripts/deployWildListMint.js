require('@nomiclabs/hardhat-etherscan');
const hre = require("hardhat");

async function main() {
  const WildListNFT= await hre.ethers.getContractFactory("WildListNFT");
  const wildListNFT= await WildListNFT.deploy( "WildList","WLDLST",
  "ipfs://QmTBLmWzueEkFNPZSHADHchQBv6dPtbs59YJ79wKqaBtRS/","ipfs://QmegZthBEZ79JmPy72TfZUmcgPDhvpNdHUFUR3DdC5GRDz/");

  await wildListNFT.deployed();

  console.log("Contract deployed to:",wildListNFT.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});