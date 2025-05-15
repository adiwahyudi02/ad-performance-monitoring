import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { useGetSummaryQuery } from "@/hooks/queries/useGetSummaryQuery";
import { api } from "@/api/zodiosApi";
import { ReactQueryProvider } from "@/providers/react-query.provider";
import { ToastProvider } from "@/contexts/toast.context";
import { summariesMock } from "@/api/__mocks__/summary.mocks";

const mockAxios = new MockAdapter(api.axios);

// Wrapper to provide necessary context for the hook
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryProvider>
    <ToastProvider>{children}</ToastProvider>
  </ReactQueryProvider>
);

describe("useGetSummaryQuery", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test("should return single summary data by id", async () => {
    const summaryId = summariesMock[0].id;

    mockAxios.onGet(`/summaries/${summaryId}`).reply(() => {
      return [200, summariesMock[0]];
    });

    const { result } = renderHook(() => useGetSummaryQuery(summaryId), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(summariesMock[0]);
  });
});
