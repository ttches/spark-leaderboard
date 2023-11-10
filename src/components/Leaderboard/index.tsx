import styled from "styled-components";

import LeaderboardImage from "/leaderboard.png";
import TableHeader from "/table-header.png";
import Table from "../Table";

const LeaderBoardContainer = styled.div`
  width: calc(100vw - 360px);
  height: 100vh;
  background: url(${LeaderboardImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 190px 30px 30px 80px;
`;

const Header = styled.div`
  width: 100%;
  height: 135px;
  background: url(${TableHeader});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom left;
`;

const Leaderboard = () => {
  return (
    <LeaderBoardContainer>
      <TableContainer>
        <Header />
        <Table />
      </TableContainer>
    </LeaderBoardContainer>
  );
};

export default Leaderboard;
