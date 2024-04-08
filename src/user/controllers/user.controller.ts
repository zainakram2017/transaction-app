import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/createUserDto';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/updateUserDto';
import { JwtGuard } from '../../auth/guards/auth-guard.jwt';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('userDetails')
  @UseGuards(JwtGuard)
  async getUserDetails(@CurrentUser() user: User): Promise<User> {
    return await this.userService.getUserDetails(user);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Get()
  @UseGuards(JwtGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }
}
