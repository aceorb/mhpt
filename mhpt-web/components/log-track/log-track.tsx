"use client";

import { useEffect, useState } from "react";
import TrendChart from "@/components/log-track/trend-chart";

import io from 'socket.io-client';
const socket = io('http://localhost:9000');

import { Select, SelectItem } from "@nextui-org/react";
import { LogRecord, TrendAggregateMap } from "@/types";
import { SymptomsOfDepressionChoice, TrendTypesChoice } from "@/common/constants";
import { transformDataToWeekly } from "@/common/utils";
import api from "@/services/api";


export default function LogTrack() {
  const [trendType, setTrendType] = useState('day');
  const [logData, setLogData] = useState<LogRecord[]>([]);

  useEffect(() => {
    getLogs();

    socket.on('message', (newData) => {
      console.log('message:', newData);
    });

    socket.on('tracking-log', (data) => {
      setLogData(data);
    });

    return () => {
      socket.off('message');
      socket.off('tracking-log');
    };
  }, [])

  const getLogs = async () => {
    const data = await api.getLogs();
    setLogData(data);
  }

  return (
    <div className="flex flex-col mt-8 gap-4">
      <Select className="max-w-48" selectedKeys={[trendType]} onSelectionChange={(value) => {setTrendType(value.currentKey as string)}}>
        {TrendTypesChoice.map((item) => (
          <SelectItem key={item.value}>{item.text}</SelectItem>
        ))}
      </Select>
      {trendType === 'day' && <TrendChart data={logData}/>}
      {trendType !== 'day' && <TrendChart data={transformDataToWeekly(trendType, logData)}/>}
    </div>
  );
}

