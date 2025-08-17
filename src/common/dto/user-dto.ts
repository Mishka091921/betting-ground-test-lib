// modules/user/application/dto/user.dto.ts
import { IsNumber, IsString, IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  member_idx!: number;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsOptional()
  nick_name?: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsNumber()
  @IsNotEmpty()
  level!: number;
}
