const TicTac = artifacts.require("TicTac");

module.exports = function(deployer) {
  deployer.deploy(TicTac);
};
