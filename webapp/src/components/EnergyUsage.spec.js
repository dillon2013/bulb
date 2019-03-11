import React from 'react';
import { shallow } from 'enzyme';
import { EnergyUsage, calculateEnergyUsage } from "./EnergyUsage";

const props = {
  meterReadingsData: [
    {
      "cumulative": 17600,
      "readingDate": "2017-03-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 17859,
      "readingDate": "2017-04-30T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 18102,
      "readingDate": "2017-05-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 18290,
      "readingDate": "2017-06-30T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 18453,
      "readingDate": "2017-07-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 18620,
      "readingDate": "2017-08-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 18782,
      "readingDate": "2017-09-30T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 18965,
      "readingDate": "2017-10-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 19230,
      "readingDate": "2017-11-30T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 19517,
      "readingDate": "2017-12-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 19827,
      "readingDate": "2018-01-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 20113,
      "readingDate": "2018-02-28T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 20376,
      "readingDate": "2018-03-31T00:00:00.000Z",
      "unit": "kWh"
    },
    {
      "cumulative": 20610,
      "readingDate": "2018-04-30T00:00:00.000Z",
      "unit": "kWh"
    }
  ]
};

describe('EnergyUsage', () => {
  it('should display "Energy Usage" title', () => {
    const wrapper = shallow(<EnergyUsage {...props}/>);
    expect(wrapper.find('h2').text()).toMatch(/Energy Usage/)
  });
});

describe('calculateEnergyUsage', () => {
  it('should return an array', () => {
    const {meterReadingsData} = props;
    const usage = calculateEnergyUsage(meterReadingsData);
    expect(Array.isArray(usage)).toBeTruthy();
  })

  it('should return an array of energy usage', () => {
    const {meterReadingsData} = props;
    const usage = calculateEnergyUsage(meterReadingsData);
    expect(usage.length).toEqual(meterReadingsData.length - 2);
    expect(usage[0].energyUsage).toEqual(meterReadingsData[1].cumulative - meterReadingsData[0].cumulative);
    expect(usage[1].energyUsage).toEqual(meterReadingsData[2].cumulative - meterReadingsData[1].cumulative);
    expect(usage[2].energyUsage).toEqual(meterReadingsData[3].cumulative - meterReadingsData[2].cumulative);
  })
})
