import { Allow } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@/application/modules/users/entities/user.entity';
import { EntityHelper } from '@/application/utils/entity-helper';

@Entity()
export class Forgot extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Allow()
  @Column()
  @Index()
  hash: string;

  @Allow()
  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
