import { Test, TestingModule } from '@nestjs/testing';
import { CRED } from 'src/app.entity';
import { LedgerService } from '../ledger.service';

const mockLedgerService = () => ({
    findAll: jest.fn(() => []),
    storeData: jest.fn(() => "Some Value"),
    checkArray: jest.fn(() => true),
});

describe('LedgerService', () => {
    let ledgerService: LedgerService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {provide: LedgerService, useFactory: mockLedgerService},
            ],
        }).compile();

        ledgerService = await app.get<LedgerService>(LedgerService);
    });

    describe('Service should be defined', () => {
        it('findAll function should be callable', () => {
            expect(ledgerService.findAll()).toBeDefined();
        });

        it('storeData funbction should be callable', async() => {
            let subgraphData: CRED;
            expect(await ledgerService.storeData(subgraphData)).toEqual('Some Value');
        });

        it('fn checkArray validation', async() => {
            expect(await ledgerService.checkArray([])).toEqual(true);
        });
    })
});

