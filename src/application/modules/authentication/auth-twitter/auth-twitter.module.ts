import { AuthModule } from '@/application/modules/authentication/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthTwitterController } from './auth-twitter.controller';
import { AuthTwitterService } from './auth-twitter.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthTwitterService],
  exports: [AuthTwitterService],
  controllers: [AuthTwitterController],
})
export class AuthTwitterModule {}
