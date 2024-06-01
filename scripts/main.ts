import { ethers, run, network } from "hardhat";

//main
const main = async () => {
    //We get the entire contract object just like from ethers.js but in one line of code since hardhat
    //already makes the contract factory and saves that information when we compile the code
    //We also don't have to specify the rpc url or the private key because that information is stored in hardhat.config.ts
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying...");
    //Deploying is a simple as this
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
    console.log(
        `Deployed in this address: ${await simpleStorage.getAddress()}`,
    );
    //console.log(network.config);

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        //This would confirm if the transaction has been mined at least 6 times so that we know that etherscan has read this transcation
        simpleStorage.deploymentTransaction()?.wait(6);
        const address: string = await simpleStorage.getAddress();
        verify(address, []);
    }

    //Interacting with the smart contract is the same as in ethers.js
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);

    // Update the current value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value is: ${updatedValue}`);
};

//This is not functionable in hardhat anymore just use the command line
const verify = async (contractAddress: string, args: any) => {
    try {
        console.log("Verifying contract...");
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        console.error(error);
    }
};

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });
