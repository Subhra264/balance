// https://eth-rinkeby.alchemyapi.io/v2/ei3IZ_W1YlZDj7dkX6-T6JVhU-RcsG0O

import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-waffle"
import Config from './config'

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/ei3IZ_W1YlZDj7dkX6-T6JVhU-RcsG0O',
      accounts: [ Config.accountKey ]
    }
  }
};

export default config;
