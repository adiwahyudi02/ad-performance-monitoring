import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { useGetSummariesQuery } from "@/hooks/queries/useGetSummariesQuery";
import { api } from "@/api/zodiosApi";
import { ReactQueryProvider } from "@/providers/react-query.provider";
import { ToastProvider } from "@/contexts/toast.context";
import { summariesMock } from "@/api/__mocks__/summary.mocks";

const mockAxios = new MockAdapter(api.axios);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryProvider>
    <ToastProvider>{children}</ToastProvider>
  </ReactQueryProvider>
);

describe("useGetSummariesQuery", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test("should return summaries data with all params", async () => {
    mockAxios.onGet("/summaries").reply((config) => {
      const urlParams = new URLSearchParams(config.params);

      expect(urlParams.get("_page")).toBe("1");
      expect(urlParams.get("_limit")).toBe("5");
      expect(urlParams.get("name_like")).toBe("test");
      expect(urlParams.get("ctrTarget_ne")).toBe("null");
      expect(urlParams.get("impressionTarget_ne")).toBe("null");
      expect(urlParams.get("conversionRateTarget_ne")).toBe("null");
      expect(urlParams.get("startDate_gte")).toBe("2023-01-01");
      expect(urlParams.get("endDate_lte")).toBe("2023-12-31");
      expect(urlParams.get("isFulfilled")).toBe("true");

      const mockResponseData = summariesMock;
      const totalCount = mockResponseData.length;

      return [
        200,
        mockResponseData,
        { "x-total-count": totalCount.toString() },
      ];
    });

    const { result } = renderHook(
      () =>
        useGetSummariesQuery({
          _page: 1,
          _limit: 5,
          name_like: "test",
          ctrTarget_ne: "null",
          impressionTarget_ne: "null",
          conversionRateTarget_ne: "null",
          startDate_gte: "2023-01-01",
          endDate_lte: "2023-12-31",
          isFulfilled: true,
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      data: summariesMock,
      meta: {
        page: 1,
        limit: 5,
        totalCount: 2,
        totalPages: 1,
      },
    });
  });
});
