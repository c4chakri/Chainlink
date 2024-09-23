// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CustomOracle {
    // Events
    event DataRequested(bytes32 indexed requestId, address requester);
    event DataFulfilled(bytes32 indexed requestId, uint256 data);

    // Mappings to store request data
    mapping(bytes32 => uint256) public dataStore;
    mapping(bytes32 => bool) public requestFulfilled;

    // Request ID counter
    uint256 private requestCounter;

    // Only the node (oracle) can fulfill requests
    address public oracleNode;

    constructor(address _oracleNode) {
        oracleNode = _oracleNode;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleNode, "Only oracle can fulfill data");
        _;
    }

    // Function to request data
    function requestData() external returns (bytes32) {
        requestCounter++;
        bytes32 requestId = keccak256(abi.encodePacked(block.timestamp, msg.sender, requestCounter));
        emit DataRequested(requestId, msg.sender);
        return requestId;
    }

    // Function to fulfill the request by the oracle node
    function fulfillData(bytes32 requestId, uint256 data) external onlyOracle {
        require(!requestFulfilled[requestId], "Request already fulfilled");
        dataStore[requestId] = data;
        requestFulfilled[requestId] = true;
        emit DataFulfilled(requestId, data);
    }

    // Retrieve fulfilled data
    function getData(bytes32 requestId) external view returns (uint256) {
        require(requestFulfilled[requestId], "Request not fulfilled yet");
        return dataStore[requestId];
    }
}
