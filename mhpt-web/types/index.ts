import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface RadioType {
  value: string;
  text: string;
}

export type RadioGroupType = RadioType[];


export interface LogRecord {
  date: string;
  mood: number;
  anxiety: number;
  sleepHours: number;
  sleepQuality: number;
  physicalActivity: number;
  socialInteractions: number;
  stressLevels: number;
}

export interface TrendAggregateData {
  mood: number;
  anxiety: number;
  sleepHours: number;
  sleepQuality: number;
  physicalActivity: number;
  socialInteractions: number;
  stressLevels: number;
  count: number;
}

export type TrendAggregateMap = { [key: string]: TrendAggregateData };
