import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CredentNewDto } from './dto/stackDto.dto';
import { LedgerService } from './ledger.service';
import { CredentNew } from './entity/ledger.entity';

@Controller()
export class AppController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get('/data')
  async getLedgerData(): Promise<any> {
    return this.ledgerService.fetchLedgerData();
  }

  @Post('/credential')
  createCredentNewStack(@Body() credentialDto: CredentNewDto): Promise<any> {
    return this.ledgerService.createCredentNewStack(credentialDto);
  }

}
