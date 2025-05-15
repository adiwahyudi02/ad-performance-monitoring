import { makeApi, makeEndpoint } from "@zodios/core";
import {
  SummariesReqSchema,
  SummariesSchema,
  SummarySchema,
} from "../schemas/summary.schemas";

const getSummariesEndpoint = makeEndpoint({
  method: "get",
  path: "/summaries",
  alias: "getSummaries",
  parameters: [
    {
      name: "_limit",
      type: "Query",
      schema: SummariesReqSchema.shape._limit,
    },
    { name: "_page", type: "Query", schema: SummariesReqSchema.shape._page },
    {
      name: "name_like",
      type: "Query",
      schema: SummariesReqSchema.shape.name_like,
    },
    {
      name: "ctrTarget_ne",
      type: "Query",
      schema: SummariesReqSchema.shape.ctrTarget_ne,
    },
    {
      name: "impressionTarget_ne",
      type: "Query",
      schema: SummariesReqSchema.shape.impressionTarget_ne,
    },
    {
      name: "conversionRateTarget_ne",
      type: "Query",
      schema: SummariesReqSchema.shape.conversionRateTarget_ne,
    },
    {
      name: "startDate_gte",
      type: "Query",
      schema: SummariesReqSchema.shape.startDate_gte,
    },
    {
      name: "endDate_lte",
      type: "Query",
      schema: SummariesReqSchema.shape.endDate_lte,
    },
    {
      name: "isFulfilled",
      type: "Query",
      schema: SummariesReqSchema.shape.isFulfilled,
    },
  ],
  response: SummariesSchema,
});

export const getSummaryEndpoint = makeEndpoint({
  method: "get",
  path: "/summaries/:id",
  alias: "getSummary",
  response: SummarySchema,
});

export const summaryEndpoints = makeApi([
  getSummariesEndpoint,
  getSummaryEndpoint,
]);
