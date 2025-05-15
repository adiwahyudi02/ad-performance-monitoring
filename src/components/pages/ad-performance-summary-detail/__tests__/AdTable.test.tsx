import React from "react";
import { render, screen } from "@testing-library/react";
import { AdTable } from "../AdTable";
import { summariesMock } from "@/api/__mocks__/summary.mocks";

describe("AdTable Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((msg) => {
      if (
        typeof msg === "string" &&
        msg.includes("<div> cannot contain a nested <td>")
      ) {
        return;
      }
    });
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders table headers correctly", () => {
    const ads = summariesMock[0].ads;

    render(<AdTable ads={ads} />);

    // Header Assertions
    expect(screen.getByText("Ad List")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("CTR")).toBeInTheDocument();
    expect(screen.getAllByText("Actual")).not.toHaveLength(0);
    expect(screen.getAllByText("Target")).not.toHaveLength(0);
    expect(screen.getByText("Impression")).toBeInTheDocument();
    expect(screen.getByText("Conversion Rate")).toBeInTheDocument();
  });
});
