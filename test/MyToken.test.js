const Token = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });

const chai = require("./SetUpChai");
const BN = web3.utils.BN;

const expect = chai.expect;

contract("Token Test", async (accounts) => {
  const [deployerAccount, recipant, anotherAccount] = accounts;

  beforeEach("", async () => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("All token should be in my account", async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    // assert.equal( await Token.balanceOf(accounts[0]) , totalSupply );
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("It is possible to send token between accounts", async () => {
    const sendToken = 1;
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipant, sendToken)).to.eventually.be.fulfilled;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
    expect(instance.balanceOf(recipant)).to.eventually.be.a.bignumber.equal(
      new BN(sendToken)
    );
  });

  it("It is not possible to send token more token than available in total", async () => {
    let instance = this.myToken;
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);

    expect(
      instance.transfer(recipant, new BN(balanceOfDeployer.add(new BN(1))))
    ).should.be.rejectedWith(Error);
  });
});
