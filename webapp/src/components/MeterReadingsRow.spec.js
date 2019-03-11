import React from 'react';
import { shallow } from 'enzyme';
import { MeterReadingsRow } from './MeterReadingsRow';

describe('MeterReadings', () => {
  const props = {
    reading: {
      "cumulative": 18102,
      "readingDate": "2017-05-31T00:00:00.000Z",
      "unit": "kWh"
    }
  };

  it('should displaya formatted readingDate', () => {
    const wrapper = shallow(<MeterReadingsRow {...props}/>);
    expect(wrapper.find('td').at(0).text()).toMatch(/May 31st 2017/)
  });

  it('should display cumulative', () => {
    const wrapper = shallow(<MeterReadingsRow {...props}/>);
    expect(wrapper.find('td').at(1).text()).toMatch(/18102/)
  });

  it('should display unit', () => {
    const wrapper = shallow(<MeterReadingsRow {...props}/>);
    expect(wrapper.find('td').at(2).text()).toMatch(/kWh/)
  });
});
