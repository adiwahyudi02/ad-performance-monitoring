import { z } from "zod";

export const ContractSchema = z.object({
  contractId: z.string(),
  totalBudget: z.number(),
  paymentTerms: z.string(),
  contractStatus: z.string(),
});

export const AdHistorySchema = z.object({
  date: z.string(),
  actual: z.number(),
});

export const AdHistoriesSchema = z.array(AdHistorySchema);

export const AdKpiHistorySchema = z.object({
  ctr: AdHistoriesSchema,
  impression: AdHistoriesSchema,
  conversionRate: AdHistoriesSchema,
});

export const AdSchema = z.object({
  id: z.string(),
  name: z.string(),
  ctrTarget: z.number().nullable(),
  ctrActual: z.number().nullable(),
  impressionTarget: z.number().nullable(),
  impressionActual: z.number().nullable(),
  conversionRateTarget: z.number().nullable(),
  conversionRateActual: z.number().nullable(),
  isFulfilled: z.boolean(),
  history: AdKpiHistorySchema,
});

export const AdsSchema = z.array(AdSchema);

export const SummarySchema = z.object({
  name: z.string(),
  id: z.string(),
  ctrTarget: z.number().nullable(),
  ctrActual: z.number().nullable(),
  impressionTarget: z.number().nullable(),
  impressionActual: z.number().nullable(),
  conversionRateTarget: z.number().nullable(),
  conversionRateActual: z.number().nullable(),
  isFulfilled: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  ads: AdsSchema,
  contract: ContractSchema,
});

export const SummariesSchema = z.array(SummarySchema);

export const SummariesReqSchema = z.object({
  _page: z.number().optional(),
  _limit: z.number().optional(),
  name_like: z.string().optional(),
  ctrTarget_ne: z.string().nullable().optional(),
  impressionTarget_ne: z.string().nullable().optional(),
  conversionRateTarget_ne: z.string().nullable().optional(),
  startDate_gte: z.string().optional(),
  endDate_lte: z.string().optional(),
  isFulfilled: z.boolean().optional(),
});

export const SummariesResSchema = z.object({
  data: SummariesSchema,
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});

// Type inference
export type SummariesReq = z.infer<typeof SummariesReqSchema>;
export type SummariesRes = z.infer<typeof SummariesResSchema>;
export type Summaries = z.infer<typeof SummariesSchema>;
export type Summary = z.infer<typeof SummarySchema>;
export type Ad = z.infer<typeof AdSchema>;
export type Ads = z.infer<typeof AdsSchema>;
export type AdHistory = z.infer<typeof AdHistorySchema>;
export type AdHistories = z.infer<typeof AdHistoriesSchema>;
export type AdKpiHistory = z.infer<typeof AdKpiHistorySchema>;
