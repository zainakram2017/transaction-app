import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Transaction } from '../entities/transaction.entity';
import { UpdateTransactionDto } from '../dto/updateTransactionDto';
import { CreateTransactionDto } from '../dto/createTransactionDto';
import { Policy } from '../entities/policy.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
  ) { }

  public async create(payload: CreateTransactionDto, user: User) {
    const { policy, ...reqPayload } = payload
    const reqPolicy = await this.policyRepository.findOne({ where: { title: policy } })
    const result = await this.transactionRepository.save({
      ...reqPayload,
      timestamp: new Date(),
      user,
      reqPolicy
    });
    if (!result) {
      throw new BadRequestException(['Failed to create transaction']);
    }
    return result;
  }

  public async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(['Error fetching transaction']);
    }

    return transaction;
  }

  public async findAll() {
    const transactions = await this.transactionRepository.find({});
    if (!transactions) {
      throw new BadRequestException(['Error fetching transactions']);
    }

    return transactions;
  }

  public async update(id: string, payload: UpdateTransactionDto) {
    const { policy, ...reqPayload } = payload
    const updatedTransaction = await this.transactionRepository
      .createQueryBuilder()
      .update()
      .set({ ...reqPayload })
      .where('id = :id', { id })
      .execute();

    if (updatedTransaction.affected == 0) {
      throw new NotFoundException();
    }

    return updatedTransaction;
  }

  public async remove(id: number) {
    const transaction = await this.transactionRepository.delete({ id });
    if (!transaction) {
      throw new NotFoundException(['Error deleting transaction.']);
    }

    return transaction;
  }
}
