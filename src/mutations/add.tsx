import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Score = {
  timer: number;
  name1: string;
  name2: string;
  clusterName: string;
  pickupCharge: string;
  holdPrice: string;
  rejectionPenalty: string;
};

const useAddEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (score: Score) =>
      axios.post(
        "https://apik.zagforward.com/stc/pricingcache/api/v1/leaderboard/add",
        { ...score }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET-LEADERBOARD"] });
    },
  });
};

export default useAddEntryMutation;
