import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SuccessResponse {
  @ApiProperty()
  @IsBoolean()
  readonly success: boolean;

  @ApiProperty()
  @IsString()
  readonly message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}
