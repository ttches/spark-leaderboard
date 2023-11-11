import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Score = {
  time: number;
  name1: string;
  name2: string;
  clusterName: string;
  pickupCharge: string;
  holdPrice: string;
  rejectionPenalty: string;
};

type Callbacks = {
  onSuccess: () => void;
  onError: () => void;
};

const useAddEntryMutation = ({ onSuccess, onError }: Callbacks) => {
  return useMutation({
    mutationFn: (score: Score) => axios.post("/api/scores", { ...score }),
    onError,
    onSuccess,
  });
};

export default useAddEntryMutation;
