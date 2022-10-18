import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { dataStored } from "../generated/ledger/ledger"

export function createdataStoredEvent(
  _clientName: Address,
  _ledgerID: i32,
  _amount: BigInt
): dataStored {
  let dataStoredEvent = changetype<dataStored>(newMockEvent())

  dataStoredEvent.parameters = new Array()

  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "_clientName",
      ethereum.Value.fromAddress(_clientName)
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "_ledgerID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_ledgerID))
    )
  )
  dataStoredEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return dataStoredEvent
}
