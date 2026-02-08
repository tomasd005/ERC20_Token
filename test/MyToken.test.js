import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("MyToken", function () {
  it("mints the initial supply to the deployer", async function () {
    const [deployer] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000000", 18);

    const token = await ethers.deployContract("MyToken", [initialSupply]);
    await token.waitForDeployment();

    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(deployer.address)).to.equal(initialSupply);
  });

  it("transfers tokens between accounts", async function () {
    const [deployer, recipient] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);

    const token = await ethers.deployContract("MyToken", [initialSupply]);
    await token.waitForDeployment();

    const amount = ethers.parseUnits("10", 18);
    const tx = await token.transfer(recipient.address, amount);
    await tx.wait();

    expect(await token.balanceOf(recipient.address)).to.equal(amount);
    expect(await token.balanceOf(deployer.address)).to.equal(
      initialSupply - amount,
    );
  });
});
