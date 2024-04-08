import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Policy } from '../entities/policy.entity';
import { CreatePolicyDto } from '../dto/createPolicyDto';
import { UpdatePolicyDto } from '../dto/updatePolicyDto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
  ) { }

  public async create(payload: CreatePolicyDto) {
    const result = await this.policyRepository.save({
      ...payload,
    });
    if (!result) {
      throw new BadRequestException(['Failed to create policy']);
    }
    return result;
  }

  public async findOne(id: number) {
    const policy = await this.policyRepository.findOne({ where: { id } });
    if (!policy) {
      throw new NotFoundException(['Error fetching policy']);
    }

    return policy;
  }

  public async findAll() {
    const policys = await this.policyRepository.find({});
    if (!policys) {
      throw new BadRequestException(['Error fetching policys']);
    }

    return policys;
  }

  public async update(id: string, payload: UpdatePolicyDto) {
    const updatedPolicy = await this.policyRepository
      .createQueryBuilder()
      .update()
      .set({ ...payload })
      .where('id = :id', { id })
      .execute();

    if (updatedPolicy.affected == 0) {
      throw new NotFoundException();
    }

    return updatedPolicy;
  }

  public async remove(id: number) {
    const policy = await this.policyRepository.delete({ id });
    if (!policy) {
      throw new NotFoundException(['Error deleting policy.']);
    }

    return policy;
  }

  public async addUserToPolicy(payload: UpdatePolicyDto, user: User) {
    const policy = await this.policyRepository.findOne({
      where: { id: payload.policyId },
      relations: { users: true },
    });

    if (!policy) {
      throw new NotFoundException(['policy Not Found']);
    }
    policy.users.push(user);

    const result = await this.policyRepository.save(policy);

    if (!result) {
      throw new BadRequestException(['Failed to like policy']);
    }

    return result;
  }
}
