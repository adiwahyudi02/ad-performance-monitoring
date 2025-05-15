import { api } from "@/api/zodiosApi";
import { QUERY_KEY } from "@/constants/query-key.constants";
import { useQuery } from "@tanstack/react-query";

export const useGetSummaryQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SUMMARY, id],
    queryFn: () =>
      api.getSummary({
        params: {
          id,
        },
      }),
  });
};
