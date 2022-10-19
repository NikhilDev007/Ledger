import { Module } from '@nestjs/common';
import { AppController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [LedgerService, ConfigService],
})
export class AppModule {}


// type: 'postgres',
//     username: 'postgres',
//     password: '123456789',
//     host: 'localhost',
//     port: 5432,
//     database: 'ledgerManagement',
//     entities: [Credent],
//     synchronize: true,
//     migrations: ['dist/database/migrations/*{.ts,.js}'],
//     migrationsRun: true,