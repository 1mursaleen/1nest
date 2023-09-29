import { AuthModule } from '@/application/modules/authentication/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthFacebookController } from './auth-facebook.controller';
import { AuthFacebookService } from './auth-facebook.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthFacebookService],
  exports: [AuthFacebookService],
  controllers: [AuthFacebookController],
})
export class AuthFacebookModule {}
