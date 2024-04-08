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
import { PolicyService } from '../services/policy.service';
import { CreatePolicyDto } from '../dto/createPolicyDto';
import { UpdatePolicyDto } from '../dto/updatePolicyDto';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post('create')
  async create(@Body() createPolicyDto: CreatePolicyDto) {
    return await this.policyService.create(createPolicyDto);
  }

  @Post('add-user')
  @UseGuards(JwtGuard)
  async addLikeToQuestion(
    @Body() updatePolicyDto: UpdatePolicyDto,
    @CurrentUser() user: User,
  ) {
    return await this.policyService.addUserToPolicy(
      updatePolicyDto,
      user,
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.policyService.findOne(id);
  }

  @Get()
  @UseGuards(JwtGuard)
  async findAll() {
    return await this.policyService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id, @Body() updatePolicyDto: UpdatePolicyDto) {
    return await this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id) {
    return await this.policyService.remove(id);
  }
}
