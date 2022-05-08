// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../lib/forge-std/src/Test.sol";
import "../src/web3love.sol";

contract ContractTest is Test {
    Web3Love web3love;
    function setUp() public {
        web3love = new Web3Love();
    }

    function testExample() public {
        web3love.safeMint(address(0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc), "");
        assertEq(web3love.totalSupply(), 1);
    }
}
