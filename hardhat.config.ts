import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import * as dotenv from "dotenv";
dotenv.config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY;

const config: HardhatUserConfig = {
    //defaultNetwork is always hardhat
    defaultNetwork: "hardhat",
    //how to add a new network
    networks: {
        sepolia: {
            url: SEPOLIA_URL!,
            accounts: [SEPOLIA_PRIVATE_KEY!],
            chainId: 11155111,
        },
        //How to make a localhost in hardhat
        //Make sure to run npx hardhat node to create a node in one shell
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.24",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY!,
    },
    //This gives us an idea of the amount of gas/cost our smart contracts would spend from our tests
    gasReporter: {
        currency: "USD",
        L1: "fantom",
        coinmarketcap: COINMARKET_API_KEY!,
    },
};

export default config;
