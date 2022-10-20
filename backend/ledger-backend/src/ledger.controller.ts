import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InputData } from './interface/subgraph.interface';
import { CRED } from './ledger.entity';
import { LedgerService } from './ledger.service';

// set route 'home' to response
// to make this controller need to define annnotation before class
@Controller('/ledger')
export class LedgerController {
  constructor(
    // define injected dependency 
    private readonly ledgerService: LedgerService
  ) {}
  
  // route to query data from subgraph. 
  @Get('/data')
  async getLedgerData(): Promise<any[]> {
    return this.ledgerService.fetchLedgerData();
  }
  
  // route to store data manually in database.
  @Post('/credential')
  createCredentNewStack(@Body() credentialDto: CRED): Promise<any> {
    return this.ledgerService.createCredentNewStack(credentialDto)
  }
}
