import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

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
    },
    solidity: "0.8.24",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY!,
    },
};

export default config;
