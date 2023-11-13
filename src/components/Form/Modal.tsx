import styled from "styled-components";
import { calculateTotalTime, formatTime } from "../../helpers/formatTime";
import useListQuery from "../../assets/queries/list";
import { LeaderBoardResponse } from "../Leaderboard";
import sortList from "../Leaderboard/sortList";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Container = styled.div`
  background-color: #010206;
  border: 6px solid white;
  border-radius: 15px;
  padding: 20px 60px;
`;

const Rank = styled.h1`
  color: #11fd01;
  text-align: center;
  font-family: "Formula1";
  font-size: 50px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-family: "Formula1";
  font-size: 45px;
  margin-bottom: 8px;
  color: white;
  text-align: center;
`;

const Time = styled.div`
  color: white;
  font-family: "Digital";
  font-size: 200px;
  line-height: 1.2;
`;

type ModalProps = {
  time: number;
  pickupCharge: string;
  holdPrice: string;
  rejectionPenalty: string;
};

const Modal = ({
  holdPrice,
  pickupCharge,
  rejectionPenalty,
  time,
}: ModalProps) => {
  const { data: leaderboardData } = useListQuery();
  const sortedLeaderboardData = sortList(leaderboardData);

  const finalScore = calculateTotalTime({
    timer: time,
    pickupCharge: Number(pickupCharge),
    holdPrice: Number(holdPrice),
    rejectionPenalty: Number(rejectionPenalty),
  });

  const formattedScore = formatTime(finalScore);

  const rank = sortedLeaderboardData?.findIndex(
    (entry: LeaderBoardResponse) =>
      entry.timer === time &&
      entry.pickupCharge === Number(pickupCharge) &&
      entry.holdPrice === Number(holdPrice) &&
      entry.rejectionPenalty === Number(rejectionPenalty)
  );

  return (
    <Wrapper>
      <Container>
        <Title>New time posted!</Title>
        {rank > -1 && <Rank># {rank + 1}</Rank>}
        <Time>{formattedScore}</Time>
      </Container>
    </Wrapper>
  );
};

export default Modal;
