import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserInfoResponse {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly id: string;

  constructor(username: string, id: string) {
    this.username = username;
    this.id = id;
  }
}
