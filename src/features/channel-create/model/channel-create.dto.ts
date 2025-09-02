// dtos/signup.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChannelCreateDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  workspaceId!: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  isPublic!: boolean;
}
