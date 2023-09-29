import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';

import { lowerCaseTransformer } from '@/application/utils/transformers/lower-case.transformer';
import { IsNotExist } from '@/application/utils/validators/is-not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;
}
