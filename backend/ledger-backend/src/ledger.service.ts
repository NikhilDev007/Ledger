import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import fetch from 'cross-fetch';
import { Repository } from 'typeorm';
import { CredentNewDto } from './dto/stackDto.dto';
import { CredentNew } from './entity/ledger.entity';

@Injectable()
export class LedgerService {
  private readonly graphBaseUrl: string;
  constructor() {
    this.graphBaseUrl =
      'https://api.thegraph.com/subgraphs/name/nikhildev007/ledger';
  }


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


  async createCredentNewStack(credentialDto: CredentNewDto): Promise<any> {
    const { userAddress , userID, amount }  = credentialDto;

    const credential = new CredentNew();
    credential.userAddress = userAddress;
    credential.userID = userID;
    credential.amount = amount;
    
    return [credential.userAddress, true];
  }


}
