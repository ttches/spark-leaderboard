import styled from "styled-components";
import LeaderboardImage from "/leaderboard.png";

const LeaderBoardContainer = styled.div`
  width: calc(100vw - 360px);
  height: 100vh;
  background: url(${LeaderboardImage}) no-repeat left;
`;

const Leaderboard = () => (
  <LeaderBoardContainer>Leaderboard</LeaderBoardContainer>
);

export default Leaderboard;
