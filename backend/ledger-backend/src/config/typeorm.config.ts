import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CredentNew } from 'src/entity/ledger.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456789',
    database: 'subgraphDataManagement',
    entities: [CredentNew],
    synchronize: true,
    migrationsRun: true,
}