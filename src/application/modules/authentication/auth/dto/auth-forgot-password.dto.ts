import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { lowerCaseTransformer } from '@/application/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthForgotPasswordDto {
  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;
}
