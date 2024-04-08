import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUserDto';
import { AuthService } from 'src/auth/services/auth.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/updateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  public async createUser(payload: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new BadRequestException(['Email is already taken']);
    }

    const user = new User();
    user.name = payload.name;
    user.userName = payload.userName;
    user.email = payload.email;
    user.password = await this.authService.hashPassword(payload.password);
    user.age = payload.age;

    const result = await this.userRepository.save(user);
    if (!result) {
      throw new BadRequestException(['Failed to create user']);
    }

    const token = this.authService.getTokenForUser(user);

    return { result, token };
  }

  public async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(['Error fetching User']);
    }

    return user;
  }

  public async findAll() {
    const users = await this.userRepository.find( );
    if (!users) {
      throw new BadRequestException(['Error fetching Users']);
    }

    return users;
  }

  public async getUserDetails(user: User) {
    const userData = await this.userRepository.findOne({
      where: { id: user.id },
      relations: {
        transactions: true,
        policies: true
      },
    });
    if (!userData) {
      throw new BadRequestException(['Error fetching topics']);
    }

    return userData;
  }

  public async update(id: string, payload: UpdateUserDto) {
    const updatedUser = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ ...payload })
      .where('id = :id', { id })
      .execute();

    if (updatedUser.affected == 0) {
      throw new NotFoundException();
    }

    return updatedUser;
  }
}
