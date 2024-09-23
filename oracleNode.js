require('dotenv').config();
const { ethers,JsonRpcProvider} = require('ethers');

// Load environment variables
const provider = new JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Oracle contract ABI and address
const oracleAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_oracleNode",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "data",
				"type": "uint256"
			}
		],
		"name": "DataFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "DataRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "data",
				"type": "uint256"
			}
		],
		"name": "fulfillData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "dataStore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "oracleNode",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "requestFulfilled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const oracleAddress = process.env.CONTRACT_ADDRESS;
const oracleContract = new ethers.Contract(oracleAddress, oracleAbi, wallet);

// Custom function to fetch or generate data
function fetchCustomData() {
    // Your logic to fetch data (random value in this case)
    return Math.floor(Math.random() * 1000);
}

// Function to listen for data requests
async function listenForRequests() {
    oracleContract.on("DataRequested", async (requestId, requester) => {
        console.log(`Data requested with requestId: ${requestId} from requester: ${requester}`);

        const data = fetchCustomData();
        console.log(`Data fetched: ${data}`);

        // Fulfill the data request
        try {
            const tx = await oracleContract.fulfillData(requestId, data);
            console.log(`Transaction hash: ${tx.hash}`);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();
            console.log(`Data fulfilled with value: ${data}, Block Number: ${receipt.blockNumber}`);
        } catch (error) {
            console.error('Error fulfilling data:', error);
        }
    });
}

// Start listening for requests
listenForRequests().then(() => {
    console.log('Listening for data requests...');
}).catch(console.error);
