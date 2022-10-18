import { BigInt } from "@graphprotocol/graph-ts"
import { ledger, dataStored } from "../generated/ledger/ledger"
import { LedgerData } from "../generated/schema"

export function handledataStored(event: dataStored): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let ledgerData = LedgerData.load(event.transaction.hash
        .toHexString()
        .concat("-").
        concat(event.logIndex.toString())
      );

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!ledgerData) {
    ledgerData = new LedgerData(
      event.transaction.hash
      .toHexString()
      .concat("-").
      concat(event.logIndex.toString())
    );

    // Entity fields can be set using simple assignments
    ledgerData.txCount = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  ledgerData.txCount = ledgerData.txCount.plus(BigInt.fromI32(1));

  // Entity fields can be set based on event parameters
  ledgerData.clientName = event.params._clientName
  ledgerData.ledgerID = event.params._ledgerID
  ledgerData.amount = event.params._amount
  ledgerData.timestamp = event.block.timestamp

  // Entities can be written to the store with `.save()`
  ledgerData.save()
}
