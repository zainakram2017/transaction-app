import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(['User not found']);
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException(['Wrong Password']);
    }

    return user;
  }
}
