// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./BNFToken.sol";

contract BrandNewSwap {
    string public name = "Brand New Swap";
    BNFToken public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(BNFToken _token) {
        token = _token;
    }

    function buyTokens() public payable{
        uint tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public payable{
        require(token.balanceOf(msg.sender) >= _amount);

        uint etherAmount = _amount / rate;

        require(address(this).balance >= etherAmount);

        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);

        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}