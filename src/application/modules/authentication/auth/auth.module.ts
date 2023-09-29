import { ForgotModule } from '@/application/modules/authentication/forgot/forgot.module';
import { SessionModule } from '@/application/modules/authentication/session/session.module';
import { MailModule } from '@/application/modules/mail/mail.module';
import { UsersModule } from '@/application/modules/users/users.module';
import { IsExist } from '@/application/utils/validators/is-exists.validator';
import { IsNotExist } from '@/application/utils/validators/is-not-exists.validator';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ForgotModule,
    SessionModule,
    PassportModule,
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    IsExist,
    IsNotExist,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
