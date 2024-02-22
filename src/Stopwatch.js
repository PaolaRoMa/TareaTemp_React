import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StopwatchContainer = styled.div`
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
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #218838;
  }
`;

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setTime(0);
    setRunning(false);
  };

  return (
    <StopwatchContainer>
      <h2>Cronómetro</h2>
      <TimeDisplay>{`Tiempo: ${time} segundos`}</TimeDisplay>
      <Button onClick={handleStartStop}>{running ? 'Detener' : 'Comenzar'}</Button>
      <Button onClick={handleReset}>Restablecer</Button>
    </StopwatchContainer>
  );
};

export default Stopwatch;
