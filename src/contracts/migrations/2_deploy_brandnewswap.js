const BNFToken = artifacts.require("BNFToken");
const BrandNewSwap = artifacts.require("BrandNewSwap");

module.exports = async function (deployer) {
  await deployer.deploy(BNFToken);
  const token = await BNFToken.deployed()

  await deployer.deploy(BrandNewSwap, token.address);
  const bns = await BrandNewSwap.deployed()

  // Transfer all the tokens to the swap contract address
  await token.transfer(bns.address, '1000000000000000000000000')
};
