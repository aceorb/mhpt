"use client";

import { Radio, RadioGroup } from "@nextui-org/radio";

import { RadioGroupType } from "@/types";

export const LikertScaleGroup = (
  { data, value, onValueChange }: {data: RadioGroupType; value: string;  onValueChange:(value: string)=>void}) => {
  return (
    <RadioGroup orientation="horizontal" value={value} onValueChange={onValueChange} >
      {data.map((item, index: number) => (
        <Radio
          key={index}
          value={item.value}
        >
          {item.text}
        </Radio>
      ))}
    </RadioGroup>
  );
};
