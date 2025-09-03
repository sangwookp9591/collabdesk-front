// dtos/signup.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChannelInviteDto {
  @IsEmail({}, { message: '올바른 이메일을 입력해주세요.' })
  email!: string;

  @IsNotEmpty()
  workspaceId!: string;

  @IsNotEmpty()
  channelId!: string;

  @IsNotEmpty()
  channelRole!: string;
}
