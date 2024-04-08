import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Policy } from './policy.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionType: string;

  @Column({ nullable: true })
  amount: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @ManyToOne(() => Policy, policy => policy.transaction, { nullable: true })
  policy: Policy;
}
