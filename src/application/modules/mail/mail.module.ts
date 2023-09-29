import { MailerModule } from '@/application/facilities/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
