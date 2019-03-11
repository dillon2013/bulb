import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { EnergyUsage } from './components/EnergyUsage';
import { MeterReadings } from './components/MeterReadings';

const Wrapper = styled.div`
  width: 1500px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
`;

const StyledButton = styled.button`
  padding: 20px;
  font-size: 20px;
  background-color: rgb(0, 173, 85);
  color: white;
  border-radius: 5px;
`;

export class App extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      meterReadingsData: [],
      selectedUsage: 'default'
    }
    this.viewDefaultDisplay = this.viewDefaultDisplay.bind(this);
    this.viewEstimateEndOfMonthReadings = this.viewEstimateEndOfMonthReadings.bind(this);
    this.viewEstimateEnergyUsageForMonth = this.viewEstimateEnergyUsageForMonth.bind(this);
  }

  componentDidMount () {
    axios.get('https://storage.googleapis.com/bulb-interview/meterReadingsReal.json')
      .then(({data}) => {
        const meterReadingsData = data.electricity;
        this.setState(() => ({
          meterReadingsData
        }))
      });
  }

  viewDefaultDisplay() {
    this.setState(() => ({selectedUsage: 'default'}))
  }

  viewEstimateEndOfMonthReadings() {
    this.setState(() => ({selectedUsage: 'estimateMonthReading'}))
  }

  viewEstimateEnergyUsageForMonth() {
    this.setState(() => ({selectedUsage: 'estimateMonthUsage'}))
  }

  render () {
    const {meterReadingsData, selectedUsage} = this.state;
    const { viewDefaultDisplay, viewEstimateEndOfMonthReadings, viewEstimateEnergyUsageForMonth} = this;
    return (
      <Wrapper>
        <StyledButton onClick={viewDefaultDisplay}>default energy usage</StyledButton>
        <StyledButton onClick={viewEstimateEndOfMonthReadings}>estimate end of month readings</StyledButton>
        <StyledButton onClick={viewEstimateEnergyUsageForMonth}>estimate energy usage for month</StyledButton>
        <EnergyUsage meterReadingsData={meterReadingsData} selectedUsage={selectedUsage}/>
        <MeterReadings meterReadingsData={meterReadingsData}/>
      </Wrapper>
    )
  }
}

