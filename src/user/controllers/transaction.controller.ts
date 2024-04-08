import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/auth-guard.jwt';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { CreateTransactionDto } from '../dto/createTransactionDto';
import { TransactionService } from '../services/transaction.service';
import { UpdateTransactionDto } from '../dto/updateTransactionDto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(@Body() createTransactionDto: CreateTransactionDto, @CurrentUser() user: User) {
    return await this.transactionService.create(createTransactionDto, user);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionService.findOne(id);
  }

  @Get()
  @UseGuards(JwtGuard)
  async findAll() {
    return await this.transactionService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id, @Body() updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id) {
    return await this.transactionService.remove(id);
  }
}
