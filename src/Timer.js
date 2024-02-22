import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
  margin: auto;
`;
const ExpiredMessage = styled.p`
  color: red;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 10px;
  &:hover {
    background-color: #218838;

  }
`;


const Timer = () => {
  const [initialTime, setInitialTime] = useState(60);
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const audioRef = React.useRef(null); // Ref para el elemento de audio

  useEffect(() => {
    let interval;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setRunning(false);
      setTimerExpired(true);

      // Reproducir el sonido al expirar el temporizador
      if (audioRef.current) {
        audioRef.current.play();
      }

      setTimeout(() => {
        setTimerExpired(false);
        handleReset();
      }, 10000); // Mostrar el mensaje durante 3 segundos antes de reiniciar
    }

    return () => clearInterval(interval);
  }, [running, time]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setTime(initialTime);
    setRunning(false);
    setTimerExpired(false);
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    setInitialTime(isNaN(inputValue) ? 0 : inputValue);
    setTime(isNaN(inputValue) ? 0 : inputValue);
  };

  return (
    <TimerContainer>
      <h2>Temporizador</h2>
      <label>
        Establecer temporizador (segundos):
        <input type="number" value={initialTime} onChange={handleInputChange} />
      </label>
      <p>{`Tiempo restante: ${time} segundos`}</p>
      {timerExpired && <ExpiredMessage>¡Terminó el tiempo! El temporizador ha llegado a cero.</ExpiredMessage>}
      <Button onClick={handleStartStop}>{running ? 'Pausar' : 'Comenzar'}</Button>
      <Button onClick={handleReset}>Restablecer</Button>
      <audio ref={audioRef} src="/sounds/alarm.wav" />
    </TimerContainer>
  );
};

export default Timer;