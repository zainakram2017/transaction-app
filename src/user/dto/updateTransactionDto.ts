import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './createTransactionDto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
