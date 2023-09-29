import { Allow } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityHelper } from '@/application/utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Status extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column()
  name?: string;
}
