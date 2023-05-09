//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";
//via these console library hum solidity ke ander javascript ka code likh sakte hai jo debugging me kaam aayega

contract Token{
    string public name ="HardHat Token";
    string public symbol ="hht";
    uint public totalSupply =10000;

    address public owner;
    mapping(address=>uint256) balances;

    constructor(){
        balances[msg.sender]= totalSupply;
        owner=msg.sender;
    }

  function transfer(address to, uint amount)  external{
      console.log("++sender Balance is %s tokens++ ",balances[msg.sender]);
      console.log("++sender is sending %s tokens to %s address++",amount,to);
    require(balances[msg.sender]>=amount,"not have enough token");
    balances[msg.sender]-=amount; //balances[msg.sender]=balances[msg.sender]-amount;
    balances[to]+=amount; //balances[to]=balances[to]+amount
  }
    function balanceOf(address account) external view returns(uint ){

    return balances[account];
  }
}
