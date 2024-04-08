import { IsDefined, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  name: string;
  @IsDefined()
  userName: string;
  @IsDefined()
  password: string;
  @IsDefined()
  age: number;
  @IsEmail()
  email: string;
}
