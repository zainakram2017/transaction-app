import { IsDefined, IsOptional } from 'class-validator';

export class CreatePolicyDto {
  @IsDefined()
  title: string;
  @IsOptional()
  policyId: number;
}
