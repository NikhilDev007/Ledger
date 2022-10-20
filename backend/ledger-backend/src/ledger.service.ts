import { Injectable, NotFoundException } from '@nestjs/common';
import fetch from 'cross-fetch';
import { InputData } from './interface/subgraph.interface';
import { CRED } from './ledger.entity';

@Injectable()
export class LedgerService {
  private readonly graphBaseUrl: string;
  constructor() {
    this.graphBaseUrl =
      'https://api.thegraph.com/subgraphs/name/nikhildev007/ledger'
  }

  /**
   * @notice used in controller to query data from subgraph
   */
   async fetchLedgerData(): Promise<any> {
    // query ledger data from the subgraph
    const ledgerDataQuery = {
      query: `
      {
        ledgerDatas(subgraphError: allow) {
          id	
          txCount
          clientName
          ledgerID
          amount
          timestamp
        }
      }`,
    };

    // fetch the data from subgraph url currently deployed 
    // when sending data to web server, the data has to be string
    const ledgerData = await fetch(this.graphBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(ledgerDataQuery),
    })
      .then((res) => res.json())
      .then((resJson) => {
        return resJson?.data?.ledgerDatas;
      });

    if (ledgerData == null) {
      throw new NotFoundException("Ledger data is not available")
    }
    return ledgerData;
  }

  /**
   * @notice to check the return variable is array or not
   * @returns true: for array otherwise false.
   */
  checkArray(array): boolean {
    return Array.isArray(array) && array.length ? true : false;
  }

  /**
   * @notice function used to store data manually in database.
   */
  async createCredentNewStack(subgraphData: CRED): Promise<CRED> {
    const { id, userAddress, userID, amount } = subgraphData;

    const info = new CRED();
    info.id = id;
    info.userAddress = userAddress;
    info.userID = userID;
    info.amount = amount;
    await info.save();
    return info;
  }

}
