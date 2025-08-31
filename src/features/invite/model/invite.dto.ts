// dtos/signup.dto.ts
import { IsEmail } from 'class-validator';

export class InviteDto {
  @IsEmail({}, { message: '올바른 이메일을 입력해주세요.' })
  email!: string;
}
