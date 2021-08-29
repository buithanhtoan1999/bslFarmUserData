const { ethers } = require("ethers");
const fs = require("fs");
module.exports = async function getJsonDataUser() {
  //network
  const network = "mainnet";
  //contract address
  const contractAdress = "0x03365085EF9A639F2bA0556fD4a961f10383fc57";
  // abi
  const ABI = [
    {
      inputs: [
        {
          internalType: "contract IBEP20",
          name: "_rewardToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_rewardTokenPerBlock",
          type: "uint256",
        },
        { internalType: "uint256", name: "_startBlock", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "pid",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "pid",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "EmergencyWithdraw",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "pid",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "RewardsHarvested",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "pid",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_allocPoint", type: "uint256" },
        { internalType: "contract IBEP20", name: "_lpToken", type: "address" },
        { internalType: "bool", name: "_withUpdate", type: "bool" },
      ],
      name: "add",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "emergencyWithdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "harvest",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256[]", name: "_pids", type: "uint256[]" }],
      name: "harvestAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "isAdded",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "massUpdatePools",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "address", name: "_user", type: "address" },
      ],
      name: "pendingRewardToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "poolInfo",
      outputs: [
        { internalType: "contract IBEP20", name: "lpToken", type: "address" },
        { internalType: "uint256", name: "allocPoint", type: "uint256" },
        { internalType: "uint256", name: "lastRewardBlock", type: "uint256" },
        {
          internalType: "uint256",
          name: "accRewardTokenPerShare",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "poolLength",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardToken",
      outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardTokenPerBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "uint256", name: "_allocPoint", type: "uint256" },
        { internalType: "bool", name: "_withUpdate", type: "bool" },
      ],
      name: "set",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_rewardTokenPerBlock",
          type: "uint256",
        },
      ],
      name: "setRewardTokenPerBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "startBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_from", type: "uint256" },
        { internalType: "uint256", name: "_to", type: "uint256" },
      ],
      name: "timeMultiplier",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "totalAllocPoint",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
      name: "updatePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "userInfo",
      outputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "rewardDebt", type: "uint256" },
        { internalType: "uint256", name: "pendingReward", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_pid", type: "uint256" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "bool", name: "harvestReward", type: "bool" },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  // create provider
  const provider = await new ethers.providers.WebSocketProvider(
    "wss://bsc-ws-node.nariox.org:443"
  );

  const bslContract = await new ethers.Contract(contractAdress, ABI, provider);
  const filterDeposit = await bslContract.filters.Deposit(null, null);
  const currentBlock = await provider.getBlockNumber();
  console.log(currentBlock);
  const userData = [];
  for (i = 9437000; i < currentBlock + 5000; i = i + 5000) {
    console.log("Processing in block " + i);
    const transactionDeposit = await bslContract.queryFilter(
      filterDeposit,
      i,
      i + 5000
    );
    transactionDeposit.forEach((log) => {
      userData.push({
        address: log.args[0],
      });
    });

    console.log(userData);
  }
  fs.writeFileSync("./userData.json", JSON.stringify(userData), function (err) {
    if (err) return console.log(err);
  });
};
