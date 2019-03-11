import React from "react";
import { MeterReadingsRow } from "./MeterReadingsRow";
import styled from 'styled-components';


const StyledTable = styled.table`
  width: 100%;
  
  th{
    height: 100px;
    font-size: 20px;
    color: grey;
  }
`;

const MeterReadings = ({meterReadingsData}) => (
  <React.Fragment>
    <h2>Meter Readings</h2>
    <StyledTable>
      <tbody>
      <tr>
        <th>Date</th>
        <th>Reading</th>
        <th>Unit</th>
      </tr>
      {meterReadingsData.map((reading, i) => (
        <MeterReadingsRow className={isEven(i) ? 'even': 'odd'} key={reading.readingDate} reading={reading}/>
      ))}
      </tbody>
    </StyledTable>
  </React.Fragment>
);

export {
  MeterReadings
}


function isEven (num) {
  return (num % 2) === 0;
}
