import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';

import { lowerCaseTransformer } from '@/application/utils/transformers/lower-case.transformer';
import { IsExist } from '@/application/utils/validators/is-exists.validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsExist, ['User'], {
    message: 'emailNotExists',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
