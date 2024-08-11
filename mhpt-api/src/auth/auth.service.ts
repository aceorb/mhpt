import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { TokenResponse } from '../common/models/token-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async getAccessToken(user: User): Promise<TokenResponse> {
    const { username, id } = user;
    const payload = { username, id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async findUserById(id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  async oAuthLogin(user) {
    if (!user) {
      throw new Error('User not found!!!');
    }

    console.log('oAuthLogin', user);
    const payload = {
      email: user.email,
      name: user.name,
    };

    const found = await this.userService.findUserByEmail(payload.email);
    if(!found){
      await this.userService.registerUser(payload.name, payload.email, 'password');
    }

    const jwt = this.jwtService.sign(payload);

    return { jwt };
  }
}
