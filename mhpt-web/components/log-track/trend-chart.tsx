import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendChart = ({ data }: {data:any}) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
        <Line type="monotone" dataKey="anxiety" stroke="#82ca9d" />
        <Line type="monotone" dataKey="sleepQuality" stroke="#ffc658" />
        <Line type="monotone" dataKey="physicalActivity" stroke="#ff7300" />
        <Line type="monotone" dataKey="socialInteractions" stroke="#ff0000" />
        <Line type="monotone" dataKey="stressLevels" stroke="#00ff00" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;