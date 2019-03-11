import React from 'react';
import { shallow } from 'enzyme';
import { MeterReadings } from './MeterReadings';
import {MeterReadingsRow} from "./MeterReadingsRow";

describe('MeterReadings', () => {
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
    ]
  };

  it('should display "Meter Readings" title', () => {
    const wrapper = shallow(<MeterReadings {...props}/>);
    expect(wrapper.find('h2').text()).toMatch(/Meter Readings/)
  });

  it('should display "Date", "Reading" and "Unit" headers', () => {
    const wrapper = shallow(<MeterReadings {...props}/>);
    expect(wrapper.find('th').at(0).text()).toMatch(/Date/);
    expect(wrapper.find('th').at(1).text()).toMatch(/Reading/);
    expect(wrapper.find('th').at(2).text()).toMatch(/Unit/);
  });

  it('should display a MeterReadingsRow component per reading', () => {
    const wrapper = shallow(<MeterReadings {...props}/>);
    expect(wrapper.find(MeterReadingsRow).length).toEqual(3)
  })
});
