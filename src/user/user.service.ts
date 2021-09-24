import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userReposiroty: Repository<User>,
  ) {}

  async save(options) {
    return this.userReposiroty.save(options);
  }

  async find(options) {
    return this.userReposiroty.find(options);
  }

  async findOne(options) {
    return this.userReposiroty.findOne(options);
  }

  async update(id, options) {
    return this.userReposiroty.update(id, options);
  }
}
