import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useListQuery = () =>
  useQuery({
    queryKey: ["GET-LEADERBOARD"],
    queryFn: () =>
      axios.get(
        "https://apik.zagforward.com/stc/pricingcache/api/v1/leaderboard/get"
      ),
    ...{
      enabled: true,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
      // @ts-expect-error not typed
      select: (res) => res?.data?.content || [],
      staleTime: 1000 * 60 * 30,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  });

export default useListQuery;
