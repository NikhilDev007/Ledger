// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// contract to store data in the ledger.
contract Ledger {

    event dataStored(address indexed _clientName, uint8 _ledgerID, uint248 _amount);

    // LEDGER mapping which contains the address, id and amount of the user
    // first key: address of the user, second key: ledger id ==> amount 
    mapping(address=>mapping(uint8=>uint248)) private LEDGER;

    /**
    * @notice Function used to stor the user data into the ledger.
    * @param _clientName address of the user
    * @param _ledgerID user id 
    * @param _amount amount user wants to store inside the ledger.
    */
    function storeData(address _clientName, uint8 _ledgerID, uint248 _amount) external {
        LEDGER[_clientName][_ledgerID] = _amount;

        emit dataStored(_clientName, _ledgerID, _amount);
    }

    /**
    * @notice Function used to get data from ledger
    * @param _clientName address of the user
    * @param _ledgerID user id 
    */
    function getData(address _clientName, uint8 _ledgerID) external view returns(uint248) {
        uint248 amount = LEDGER[_clientName][_ledgerID];
        return amount;
    }
}
                                                                                                                                                                                                