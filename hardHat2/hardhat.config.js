/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
//to deploy our contract use=> npx hardhat run scripts/deploy.js --network goerli 
const ALCHEMY_API_KEY="gMMt8xbM37Xv_Hyj2vfwm7ok5o8EsAGg";
const ROPSTEN_PRIVATE_KEY="9ae1a3744a1cb98bd5ab82e3b65c83a06ace0f17da2c7a54cf9dcf54cb9a9e92";
module.exports = {
  solidity: "0.8.18",

  networks:{
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
