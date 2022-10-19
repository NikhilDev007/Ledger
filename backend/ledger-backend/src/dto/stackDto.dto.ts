import { IsNotEmpty } from 'class-validator';

export class CredentNewDto  {
    @IsNotEmpty()
    userAddress: string;

    @IsNotEmpty()
    userID: BigInt;

    @IsNotEmpty()
    amount: BigInt;
}