import styled from "styled-components";

const Container = styled.div`
  background-color: #010206;
  height: 100%;
  width: 360px;
`;

const Time = styled.div`
  font-family: "Digital";
  font-size: 95px;
`;

const Timer = () => {
  return (
    <Container>
      <Time>00:00:00</Time>;
    </Container>
  );
};

export default Timer;
