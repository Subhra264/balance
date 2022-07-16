import { ethers } from "hardhat";

async function main() {

  const Transactions = await ethers.getContractFactory('Transactions');
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions with 1 ETH deployed to:", transactions.address);
}

const executeMain = async () => {
  try {
    await main()
  } catch(err) {
    console.error(err)
    process.exitCode = 1
  }
}

executeMain()
