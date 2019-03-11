import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from "moment";

const EnergyUsage = ({meterReadingsData, selectedUsage}) => {
  let data;
  switch (selectedUsage) {
    case 'default':
      data = calculateEnergyUsage(meterReadingsData);
      break;
    case 'estimateMonthReading':
      data = estimateEndOfMonthReadings(meterReadingsData);
      break;
    case 'estimateMonthUsage':
      data =  estimateEnergyUsageForMonth(estimateEndOfMonthReadings(meterReadingsData))
      break;
  }

  return (
    <React.Fragment>
      <h2>Energy Usage</h2>
      <BarChart width={1400} height={400} data={data}>
        <XAxis dataKey="date" />
        <YAxis dataKey="energyUsage" />
        <CartesianGrid horizontal={false} />
        <Tooltip />
        <Bar dataKey="energyUsage" fill="#ffc0cb" isAnimationActive={false} />
      </BarChart>
    </React.Fragment>
  )
};


/*********************************************/

function calculateEnergyUsage(meterReadings) {
  const energyUsageData = [];
  for(let i = 0; i < meterReadings.length - 2; i++) {
    const energyUsage =
      meterReadings[i+1].cumulative - meterReadings[i].cumulative;
    energyUsageData.push({
      date: moment(meterReadings[i+1].readingDate).format('MMM Do YYYY'),
      energyUsage,
    });
  }
  return energyUsageData;
}

function estimateEndOfMonthReadings(meterReadings) {
  const estimatedEndOfMonthReadings = [];
  for (let i = 0; i < meterReadings.length - 2; i++){
    const previousMonthReading = meterReadings[i-1];
    const nextMonthReading = meterReadings[i+1];
    const thisMonthReading = meterReadings[i];

    if(previousMonthReading && nextMonthReading){
      const previousMmt = moment(previousMonthReading.readingDate);
      const nextMmt = moment(nextMonthReading.readingDate);
      const thisMonthMmt = moment(thisMonthReading.readingDate);

      const diffInDays = getDiffInDays(nextMmt, previousMmt);
      const diffInReadings = nextMonthReading.cumulative - previousMonthReading.cumulative;
      const averageUsagePerDay = diffInReadings / diffInDays;
      const averageUsageTillEndOfMonth = getDaysUntilMonthEnd(thisMonthMmt) * averageUsagePerDay;
      const estimatedEndOfMonthReading = thisMonthReading.cumulative + averageUsageTillEndOfMonth;
      estimatedEndOfMonthReadings.push({
        date: moment(thisMonthReading.readingDate).format('MMM Do YYYY'),
        energyUsage: Math.round(estimatedEndOfMonthReading)
      });
    } else {
      estimatedEndOfMonthReadings.push(null)
    }

  }
  return estimatedEndOfMonthReadings;
}

function estimateEnergyUsageForMonth(readings) {
  return readings.map((reading, i, readings) => {
    if(reading && readings[i + 1]){
      return {
        date: reading.date,
        energyUsage: readings[i + 1].energyUsage - reading.energyUsage
      };
    }
    return null;
  })
}

export {
  EnergyUsage,
  calculateEnergyUsage
}


/**
 * Returns the difference between two moment objects in number of days.
 * @param {moment} mmt1
 * @param {moment} mm2
 */
function getDiffInDays(mmt1, mm2) {
  return mmt1.diff(mm2, 'days');
}

/**
 * Return the number of days between the given moment object
 * and the end of the month of this moment object.
 * @param {moment} mmt
 */
function getDaysUntilMonthEnd(mmt) {
  return getDiffInDays(moment.utc(mmt).endOf('month'), mmt);
}
