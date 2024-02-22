import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ClockContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
  margin: auto;
`;

const TimeDisplay = styled.p`
  font-size: 24px;
`;

const Clock = () => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ClockContainer>
      <h2>Reloj</h2>
      <TimeDisplay>{`Hora actual: ${time}`}</TimeDisplay>
    </ClockContainer>
  );
};

export default Clock;

