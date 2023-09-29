import { Repository } from 'typeorm';

import { Status } from '@/application/modules/authorization/statuses/entities/status.entity';
import { StatusEnum } from '@/application/modules/authorization/statuses/statuses.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusSeedService {
  constructor(
    @InjectRepository(Status)
    private repository: Repository<Status>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: StatusEnum.active,
          name: 'Active',
        }),
        this.repository.create({
          id: StatusEnum.inactive,
          name: 'Inactive',
        }),
      ]);
    }
  }
}
