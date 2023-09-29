import { User } from '@/application/modules/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
