import { calculateTotalTime } from "../../helpers/formatTime";
import type { LeaderBoardResponse } from "./index";

const sortList = (list: LeaderBoardResponse[]) => {
  const convertedLeaderboardData = list?.map((data: LeaderBoardResponse) => {
    return {
      ...data,
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
  });

  const sortedLeaderboardData = convertedLeaderboardData?.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });

  return sortedLeaderboardData;
};

export default sortList;
