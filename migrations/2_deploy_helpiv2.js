const HelpiV2 = artifacts.require('HelpiV2');
const HelpiV2Vault = artifacts.require('HelpiV2Vault');

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });

const { singletons } = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  if (network === 'development') {
    // In a test environment an ERC777 token requires deploying an ERC1820 registry
    await singletons.ERC1820Registry(accounts[0]);
  }

  await deployer.deploy(HelpiV2);
  const token = await HelpiV2.deployed();

  await deployer.deploy(HelpiV2Vault, token.address);
};