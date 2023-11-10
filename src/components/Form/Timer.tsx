import styled from "styled-components";
import {
  getMilliseconds,
  getMinutes,
  getSeconds,
} from "../../helpers/formatTime";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border-radius: 99999px;
  font-family: "Formula1";
  font-size: 20px;
  margin-bottom: 16px;
`;

const RedButton = styled(Button)`
  border: 2px solid #aa0c0b;
  background-color: #1a1a1a;

  &:hover {
    background-color: #8b0a09;
  }
`;

export const GreenButton = styled(Button)`
  background-color: #11fd01;
  color: #010206;

  &:hover {
    background-color: #0bce00;
  }
`;

const Time = styled.div`
  font-family: "Digital";
  font-size: 95px;
  margin: 0 auto;
  color: white;
`;

type TimerProps = {
  time: number;
  setIsRunning: (isRunning: boolean) => void;
};

const Timer = ({ time, setIsRunning }: TimerProps) => {
  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    console.log(time);
    setIsRunning(false);
  };

  return (
    <Container>
      <Time>
        {getMinutes(time)}:{getSeconds(time)}:{getMilliseconds(time)}
      </Time>
      <GreenButton onClick={startTimer}>Start</GreenButton>
      <RedButton onClick={stopTimer}>Stop</RedButton>
    </Container>
  );
};

export default Timer;
