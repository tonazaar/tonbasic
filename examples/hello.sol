pragma solidity ^0.5.4;

contract HelloTON {
    uint32 timestamp;

    modifier alwaysAccept {
      tvm_accept();
      _;
    }

    function tvm_accept() private pure {}

    constructor() public {
        timestamp = uint32(now);
    }

    function touch() external alwaysAccept {
        timestamp = uint32(now);
    }

    function sayHello() external view returns (uint32) {
      tvm_accept();
        return timestamp;
    }
}
