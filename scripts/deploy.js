import { network } from "hardhat";

const { ethers } = await network.connect();

const initialSupply = ethers.parseUnits(
  process.env.INITIAL_SUPPLY ?? "1000000",
  18,
);

const token = await ethers.deployContract("MyToken", [initialSupply]);
await token.waitForDeployment();

const [deployer] = await ethers.getSigners();

console.log("MyToken deployed");
console.log("Address:", await token.getAddress());
console.log("Deployer:", deployer.address);
console.log("Initial supply:", initialSupply.toString());
