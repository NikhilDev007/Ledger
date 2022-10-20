import {BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CRED extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userAddress: string;

    @Column()
    userID: string;

    @Column()
    amount: string;
}