import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


Entity()
export class CredentNew extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userAddress: string;

    @Column()
    userID: BigInt;

    @Column()
    amount: BigInt;
}