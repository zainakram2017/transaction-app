import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './entities/transaction.entity';
import { Policy } from './entities/policy.entity';
import { PolicyService } from './services/policy.service';
import { PolicyController } from './controllers/policy.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Transaction, Policy]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  providers: [
    UserService,
    TransactionService,
    PolicyService,
    AuthService,
    JwtStrategy
  ],
  controllers: [
    UserController,
    TransactionController,
    PolicyController
  ],
})
export class UserModule { }
