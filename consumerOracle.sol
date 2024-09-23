// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICustomOracle {
    function requestData() external returns (bytes32);
    function getData(bytes32 requestId) external view returns (uint256);
}

contract ConsumerOracle {
    ICustomOracle public oracle;
    uint256 public currentData;
    bytes32 public lastRequestId;

    constructor(address _oracleAddress) {
        oracle = ICustomOracle(_oracleAddress);
    }

    // Request data from the oracle
    function requestDataFromOracle() external {
        lastRequestId = oracle.requestData();
    }

    // Manually update data after it has been fulfilled
    function updateData() external {
        uint256 data = oracle.getData(lastRequestId);
        currentData = data;
    }
}
