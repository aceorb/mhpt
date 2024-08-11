import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  mood: number;

  @ApiProperty()
  @IsNotEmpty()
  anxiety: number;

  @ApiProperty()
  @IsNotEmpty()
  sleepHours: number;

  @ApiProperty()
  @IsNotEmpty()
  sleepQuality: number;

  @ApiProperty()
  @IsNotEmpty()
  sleepDisturb: number;

  @ApiProperty()
  @IsNotEmpty()
  physicalActivity: number;

  @ApiProperty()
  @IsNotEmpty()
  physicalActivityDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  socialInteractions: number;

  @ApiProperty()
  @IsNotEmpty()
  stressLevels: number;

  @ApiProperty()
  @IsNotEmpty()
  symptomsPresence: boolean;

  @ApiProperty()
  @IsNotEmpty()
  symptoms: number;

  @ApiProperty()
  @IsNotEmpty()
  symptomLevels: number;
}
