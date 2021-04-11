// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./token/ERC20/ERC20.sol";

contract BUSD is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimal,
        uint256 supply
    ) public ERC20(name, symbol, decimal) {
        _mint(msg.sender, supply);
    }
}
