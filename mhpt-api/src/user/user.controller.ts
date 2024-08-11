import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiTags
} from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
