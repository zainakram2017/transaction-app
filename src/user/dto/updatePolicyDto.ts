import { PartialType } from '@nestjs/mapped-types';
import { CreatePolicyDto } from './createPolicyDto';

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {}
