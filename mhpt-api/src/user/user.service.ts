import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from './entities/user.entity';
import { hashPassword } from "../common/utils";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async registerUser(username: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = await hashPassword(password);
    user.username = username;
    return this.userRepository.save(user)
  }
}
