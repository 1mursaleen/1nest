import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';

import { Role } from '@/application/modules/authorization/roles/entities/role.entity';
import { Status } from '@/application/modules/authorization/statuses/entities/status.entity';
import { FileEntity } from '@/application/modules/files/entities/file.entity';
import { lowerCaseTransformer } from '@/application/utils/transformers/lower-case.transformer';
import { IsExist } from '@/application/utils/validators/is-exists.validator';
import { IsNotExist } from '@/application/utils/validators/is-not-exists.validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
