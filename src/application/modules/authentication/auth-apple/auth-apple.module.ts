import { AuthModule } from '@/application/modules/authentication/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthAppleController } from './auth-apple.controller';
import { AuthAppleService } from './auth-apple.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthAppleService],
  exports: [AuthAppleService],
  controllers: [AuthAppleController],
})
export class AuthAppleModule {}
