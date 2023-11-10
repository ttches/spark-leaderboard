import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { calculateTotalTime, formatTime } from "../../helpers/formatTime";
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

type LeaderBoardResponse = {
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
  time: number;
};

const Leaderboard = () => {
  const { data: leaderboardData } = useQuery({
    queryKey: ["GET-LEADERBOARD"],
    queryFn: () =>
      axios.get(
        "https://apik.zagforward.com/stc/pricingcache/api/v1/leaderboard/get"
      ),
    ...{
      enabled: true,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
      select: (res) => res?.data?.content || [],
      staleTime: 1000 * 60 * 30,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  });

  console.log("leaderboardData", leaderboardData);

  const convertedLeaderboardData = leaderboardData?.map(
    (data: LeaderBoardResponse) => {
      return {
        order: 0,
        combinedPlayers: `${data.name1} & ${data.name2}`,
        cluster: data.clusterName,
        time: calculateTotalTime({
          timer: data.timer,
          pickupCharge: data.pickupCharge,
          holdPrice: data.holdPrice,
          rejectionPenalty: data.rejectionPenalty,
        }),
      };
    }
  );

  const sortedLeaderboardData = convertedLeaderboardData?.sort((a, b) => {
    if (a.timer < b.timer) {
      return -1;
    }
    if (a.timer > b.timer) {
      return 1;
    }
    return 0;
  });

  const formattedLeaderboardData: Person[] = sortedLeaderboardData?.map(
    (data: Person, index: number) => {
      return {
        order: index + 1,
        combinedPlayers: data.combinedPlayers,
        cluster: data.cluster,
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
