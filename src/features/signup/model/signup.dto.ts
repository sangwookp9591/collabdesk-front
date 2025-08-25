// dtos/signup.dto.ts
import { IsEmail, IsNotEmpty, MinLength, Matches, IsOptional } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: '올바른 이메일을 입력해주세요.' })
  email!: string;

  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  name!: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  //   @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
  //     message: '비밀번호는 대문자, 숫자, 특수문자를 포함해야 합니다.',
  //   })
  password!: string;

  @IsNotEmpty({ message: '비밀번호 확인을 입력해주세요.' })
  confirmPassword!: string;

  @IsOptional()
  profileImage?: File;
}
