import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';
import { IsNotEmpty } from "class-validator";

@Entity()
export class Record{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'date' })
  date: string;

  @ApiProperty()
  @Column()
  mood: number;

  @ApiProperty()
  @Column()
  anxiety: number;

  @ApiProperty()
  @Column()
  sleepHours: number;

  @ApiProperty()
  @Column()
  sleepQuality: number;

  @ApiProperty()
  @Column()
  sleepDisturb: number;

  @ApiProperty()
  @Column()
  physicalActivity: number;

  @ApiProperty()
  @Column()
  physicalActivityDuration: number;

  @ApiProperty()
  @Column()
  socialInteractions: number;

  @ApiProperty()
  @Column()
  stressLevels: number;

  @ApiProperty()
  @Column()
  symptomsPresence: boolean;

  @ApiProperty()
  @Column()
  symptoms: number;

  @ApiProperty()
  @Column()
  symptomLevels: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.records)
  user: User;
}
