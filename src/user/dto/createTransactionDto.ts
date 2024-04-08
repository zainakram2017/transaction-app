import { IsDefined } from 'class-validator';

export class CreateTransactionDto {
  @IsDefined()
  transactionType: string;
  @IsDefined()
  amount: number;
  @IsDefined()
  policy: string;
}
