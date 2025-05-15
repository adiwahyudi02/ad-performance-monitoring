import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Table, Column } from ".";

interface User {
  id: number;
  name: string;
}

const mockData: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
];

const columns: Column<User>[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
];

// Helper wrapper to control page and rowsPerPage state for the test
function TableWrapper() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data =
    rowsPerPage > 0
      ? mockData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : mockData;

  return (
    <Table
      data={data}
      columns={columns}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={mockData.length}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
      clientPagination={true}
    />
  );
}

describe("Table component", () => {
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

  it("renders headers correctly", () => {
    render(<TableWrapper />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders correct rows for first page", async () => {
    render(<TableWrapper />);
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
    });
  });

  it("renders empty state message when no data", async () => {
    function EmptyWrapper() {
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      return (
        <Table
          data={[]}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={0}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          clientPagination={true}
        />
      );
    }
    render(<EmptyWrapper />);
    await waitFor(() => {
      expect(screen.getByText("There's no data to show!")).toBeInTheDocument();
    });
  });

  it("renders loading skeleton rows", () => {
    function LoadingWrapper() {
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      return (
        <Table
          data={mockData}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={mockData.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          clientPagination={true}
          loading={true}
        />
      );
    }
    render(<LoadingWrapper />);
    // There should be rowsPerPage * columns Skeleton components
    // Skeleton renders with role "progressbar"
    const skeletons = screen.getAllByTestId("progressbar");
    expect(skeletons.length).toBe(5 * columns.length);
  });
});
