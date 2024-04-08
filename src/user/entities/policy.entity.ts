import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @JoinTable()
  @ManyToMany(() => User, user => user.policies)
  users: User[];

  @OneToMany(() => Transaction, transaction => transaction.policy)
  transaction: Transaction;
}
