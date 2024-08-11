import { LogRecord, TrendAggregateMap } from "@/types";
import { format, startOfMonth, startOfWeek } from "date-fns";

export const transformDataToWeekly = (type: string, data: LogRecord[]) => {
  // Convert string dates to Date objects
  const parsedData = data.map(item => ({
    ...item,
    date: new Date(item.date)
  }));

  // Group data by week
  const aggregateData: TrendAggregateMap = {};

  parsedData.forEach(item => {
    let startDate;
    let key ='';
    if(type === 'week') {
      startDate = startOfWeek(item.date, { weekStartsOn: 1 }); // Monday as the start of the week
      key = format(startDate, 'yyyy-MM-dd'); // Use start of week as a key
    }
    else if (type === 'month') {
      startDate = startOfMonth(item.date); // Get the start of the month
      key = format(startDate, 'yyyy-MM'); // Use year and month as the key
    }
    else{
      return;
    }

    if (!aggregateData[key]) {
      aggregateData[key] = {
        mood: 0,
        anxiety: 0,
        sleepHours: 0,
        sleepQuality: 0,
        physicalActivity: 0,
        socialInteractions: 0,
        stressLevels: 0,
        count: 0
      };
    }

    // Accumulate metrics
    aggregateData[key].mood += item.mood;
    aggregateData[key].anxiety += item.anxiety;
    aggregateData[key].sleepHours += item.sleepHours;
    aggregateData[key].sleepQuality += item.sleepQuality;
    aggregateData[key].physicalActivity += item.physicalActivity;
    aggregateData[key].socialInteractions += item.socialInteractions;
    aggregateData[key].stressLevels += item.stressLevels;
    aggregateData[key].count += 1;
  });

  // Compute averages
  return Object.keys(aggregateData).map(key => {
    const weekData = aggregateData[key];
    return {
      date: key,
      mood: weekData.mood / weekData.count,
      anxiety: weekData.anxiety / weekData.count,
      sleepHours: weekData.sleepHours / weekData.count,
      sleepQuality: weekData.sleepQuality / weekData.count,
      physicalActivity: weekData.physicalActivity / weekData.count,
      socialInteractions: weekData.socialInteractions / weekData.count,
      stressLevels: weekData.stressLevels / weekData.count
    };
  });
};

export const isSignedIn = () => {
  const token = localStorage.getItem('authToken');
  if(token)
    return true;
  return false;
}