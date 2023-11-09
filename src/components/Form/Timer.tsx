import styled from "styled-components";

const Container = styled.div`
  background-color: #010206;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
  width: 360px;
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

const GreenButton = styled(Button)`
  background-color: #11fd01;
  color: #010206;

  &:hover {
    background-color: #0bce00;
  }
`;

const Time = styled.div`
  font-family: "Digital";
  font-size: 95px;
`;

const Timer = () => {
  return (
    <Container>
      <Time>00:00:00</Time>
      <GreenButton>Start</GreenButton>
      <RedButton>Stop</RedButton>
    </Container>
  );
};

export default Timer;
