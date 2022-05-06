const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });

const chai = require("./SetUpChai");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Sale Test", async (accounts) => {
  const [deployerAccount, recipant, anotherAccount] = accounts;

  it("It should not have any token in my deployer account", async () => {
    let instance = await Token.deployed();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("all token should be in the token sale smart contract by default", async () => {
    let instance = await Token.deployed();

    let tokenSaleSmartContractAddressBalance = await instance.balanceOf(
      TokenSale.address
    );

    let totalSupply = await instance.totalSupply();

    expect(
      tokenSaleSmartContractAddressBalance
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("should be possible to buy token", async () => {
    let tokenSaleInstance = await TokenSale.deployed();
    let tokenIntance = await Token.deployed();

    beforeBalance = await tokenIntance.beforeBalance(deployerAccount);

    await expect(
      tokenSaleInstance.sendTransaction({
        from: deployerAccount,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled;

    await expect(
      tokenIntance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(beforeBalance.add(new BN(1)));
  });
});
