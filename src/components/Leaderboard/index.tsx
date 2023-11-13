import styled from "styled-components";
import { formatTime } from "../../helpers/formatTime";
import LeaderboardImage from "/leaderboard.png";
import TableHeader from "/table-header.png";
import Table from "../Table";
import useListQuery from "../../assets/queries/list";
import sortList from "./sortList";

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

export type LeaderBoardResponse = {
  name1: string;
  name2: string;
  clusterName: string;
  timer: number;
  pickupCharge: number;
  holdPrice: number;
  rejectionPenalty: number;
};

export type Person = {
  order: number;
  combinedPlayers: string;
  cluster: string;
  time: string;
};

const Leaderboard = () => {
  const { data: leaderboardData } = useListQuery();
  const sortedLeaderboardData = sortList(leaderboardData);

  const formattedLeaderboardData: Person[] = sortedLeaderboardData?.map(
    (data, index: number) => {
      return {
        order: index + 1,
        combinedPlayers: data.combinedPlayers,
        cluster: data.cluster.toLocaleUpperCase(),
        time: formatTime(data.time),
      };
    }
  );
  console.log(
    "🚀 ~ file: index.tsx:174 ~ Table ~ formattedLeaderboardData:",
    formattedLeaderboardData
  );

  return (
    <LeaderBoardContainer>
      <TableContainer>
        <Header />
        <Table data={formattedLeaderboardData} />
      </TableContainer>
    </LeaderBoardContainer>
  );
};

export default Leaderboard;
