import { SummariesReq, SummariesRes } from "@/api/schemas/summary.schemas";
import { api } from "@/api/zodiosApi";
import { QUERY_KEY } from "@/constants/query-key.constants";

import { useQuery } from "@tanstack/react-query";

export const useGetSummariesQuery = ({
  _page: page = 1,
  _limit: limit = 5,
  name_like: nameLike,
  ctrTarget_ne: ctrTargetNe,
  impressionTarget_ne: impressionTargetNe,
  conversionRateTarget_ne: conversionRateTargetNe,
  startDate_gte: startDateGte,
  endDate_lte: endDateLte,
  isFulfilled,
}: SummariesReq) => {
  const queryKey = [
    QUERY_KEY.GET_SUMMARIES,
    {
      limit,
      page,
      ...(nameLike && { nameLike }),
      ...(ctrTargetNe && { ctrTargetNe }),
      ...(impressionTargetNe && { impressionTargetNe }),
      ...(conversionRateTargetNe && { conversionRateTargetNe }),
      ...(startDateGte && { startDateGte }),
      ...(endDateLte && { endDateLte }),
      ...(isFulfilled !== undefined && { isFulfilled }),
    },
  ];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.axios.get("/summaries", {
        params: {
          _page: page,
          _limit: limit,
          ...(nameLike && { name_like: nameLike }),
          ...(ctrTargetNe && { ctrTarget_ne: ctrTargetNe }),
          ...(impressionTargetNe && {
            impressionTarget_ne: impressionTargetNe,
          }),
          ...(conversionRateTargetNe && {
            conversionRateTarget_ne: conversionRateTargetNe,
          }),
          ...(startDateGte && {
            startDate_gte: startDateGte,
          }),
          ...(endDateLte && {
            endDate_lte: endDateLte,
          }),
          ...(isFulfilled !== undefined && { isFulfilled }),
        },
      });

      const totalCount = parseInt(response.headers["x-total-count"] || "0", 10);
      const totalPages = Math.ceil(totalCount / limit);

      const res: SummariesRes = {
        data: response.data,
        meta: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      };

      return res;
    },
  });
};
