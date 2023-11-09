import styled from "styled-components";

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
`;

type TimerProps = {
  time: number;
  setIsRunning: (isRunning: boolean) => void;
};

const Timer = ({ time, setIsRunning }: TimerProps) => {
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

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
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </Time>
      <GreenButton onClick={startTimer}>Start</GreenButton>
      <RedButton onClick={stopTimer}>Stop</RedButton>
    </Container>
  );
};

export default Timer;
