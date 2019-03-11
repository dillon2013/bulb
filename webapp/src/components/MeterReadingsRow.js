import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Row = styled.tr`
  height:70px;
  
  &:hover{
    background: #f5118f;
    color: white;
    cursor:pointer;
  }
  
  &.even {
    background-color: #cc388a;
    
    &:hover{
      background: #f5118f;
      color: white;
      cursor:pointer;
    }
  }
  
  td{
    padding: 10px
  }
  
  
`

const MeterReadingsRow = ({reading, className}) => (
  <Row className={className}>
    <td>{moment(reading.readingDate).format('MMM Do YYYY')}</td>
    <td>{reading.cumulative}</td>
    <td>{reading.unit}</td>
  </Row>
);

export {
  MeterReadingsRow
}
