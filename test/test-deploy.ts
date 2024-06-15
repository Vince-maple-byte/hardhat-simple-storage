const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
    //We can have multiple nested describes inside of a describe

    let simpleStorageFactory;
    let simpleStorage: any;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });

    //it.only would only run that specific test
    it("Store should change the value to 5", async () => {
        await simpleStorage.store(5);
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "5";
        assert.equal(currentValue.toString(), expectedValue);
    });

    //We can have multiple asserts inside of one it method.
    it("Should successfully add a new person called John with a favorite number of 3", async () => {
        await simpleStorage.addPerson("John", 3);
        const [favoriteNumber, name] = await simpleStorage.people(0); //How you get an element in an array from a smart contract
        assert.equal(name, "John");
        assert.equal(favoriteNumber.toString(), "3");
    });
});
