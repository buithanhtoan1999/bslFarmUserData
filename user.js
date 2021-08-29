const { ethers, BigNumber } = require("ethers");
const { formatEther } = require("ethers/lib/utils");
const fs = require("fs");
const address = require("./userData.json");
const ABI = require("./ABI.json");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const getUserAddress = require("./getUserAddress.js");
module.exports = async function main(poolId) {
  await getUserAddress();
  //network
  const network = "mainnet";
  //contract address
  const contractAdress = "0x03365085EF9A639F2bA0556fD4a961f10383fc57";
  // abi
  // create provider
  const provider = await new ethers.providers.WebSocketProvider(
    "wss://bsc-ws-node.nariox.org:443"
  );

  const bslContract = await new ethers.Contract(contractAdress, ABI, provider);

  //let data = await bslContract.userInfo(0,)
  const userData = [];
  for await (const add of address) {
    let balance = await bslContract.userInfo(poolId, add.address);
    userData.push({
      address: add.address,
      balance: formatEther(balance.amount),
    });
  }
  const key = "address";

  const newDataUser = [
    ...new Map(userData.map((item) => [item[key], item])).values(),
  ];

  const csvWriter = createCsvWriter({
    path: "./data.csv",
    header: [
      { id: "address", title: "ADDRESS" },
      { id: "balance", title: "BALANCE" },
    ],
  });

  await csvWriter
    .writeRecords(newDataUser) // returns a promise
    .then(() => {
      console.log("...Done");
    });
};
