import { Allow } from 'class-validator';
import { AppConfig } from 'src/config/config.type';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityHelper } from '@/application/utils/entity-helper';
import appConfig from '@/config/app.config';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'file' })
export class FileEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  path: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/') === 0) {
      this.path = (appConfig() as AppConfig).backendDomain + this.path;
    }
  }
}
