"use client";

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Skeleton,
  Box,
  TableCellProps,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { SystemStyleObject } from "@mui/system";
import { Theme } from "@mui/material/styles";

export interface Column<T> {
  label: string;
  key?: keyof T;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  colSpan?: number;
  rowSpan?: number;
  children?: Column<T>[];
  props?: TableCellProps;
}

export interface TableComponentProps<T> {
  data: T[];
  columns: Column<T>[];
  page: number; // it's 0-indexed
  rowsPerPage: number;
  totalCount?: number; // optional in client mode
  clientPagination?: boolean; // if true, pagination is handled on the client side
  rowsPerPageOptions?: number[];
  loading?: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  tableRowSx?: (row: T, theme: Theme) => SystemStyleObject<Theme>;
}

export function Table<T>({
  data,
  columns,
  page, // it's 0-indexed
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  clientPagination = false,
  rowsPerPageOptions = [5, 10, 25],
  loading = false,
  tableRowSx,
}: TableComponentProps<T>) {
  const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);

  // prevent flickering of skeleton loader when data is being loaded
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading && !!data.length) {
      setShowSkeletonLoader(true);
    } else {
      setShowSkeletonLoader(true);
      timer = setTimeout(() => {
        setShowSkeletonLoader(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [data, loading]);

  const paginatedData = useMemo(() => {
    if (!clientPagination) return data;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [clientPagination, data, page, rowsPerPage]);

  const finalTotalCount = clientPagination ? data.length : totalCount || 0;

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    onRowsPerPageChange(newLimit);
    onPageChange(0); // reset page to 0 when changing limit
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (column.render) return column.render(row);
    if (column.key) {
      const value = row[column.key];
      return typeof value === "string" || typeof value === "number"
        ? value
        : "-";
    }
    return "-";
  };

  const flattenColumns = (cols: Column<T>[]): Column<T>[] =>
    cols.flatMap((col) => (col.children ? col.children : col));

  const flattenedColumns = flattenColumns(columns);

  return (
    <Box>
      <TableContainer>
        <MuiTable>
          <TableHead>
            {/* First row (parent headers) */}
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  align={col.align || "center"}
                  colSpan={
                    col.colSpan || (col.children ? col.children.length : 1)
                  }
                  rowSpan={col.rowSpan || (col.children ? 1 : 2)}
                  {...col.props}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>

            {/* Second row (child headers) */}
            {columns.some((col) => col.children) && (
              <TableRow>
                {columns.flatMap((col) =>
                  col.children
                    ? col.children.map((child, idx) => (
                        <TableCell
                          key={`${col.label}-${idx}`}
                          align={child.align || "center"}
                          {...child.props}
                        >
                          {child.label}
                        </TableCell>
                      ))
                    : []
                )}
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {showSkeletonLoader || loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {flattenedColumns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      align={col.align || "center"}
                      {...col.props}
                    >
                      <Skeleton
                        variant="text"
                        width="100%"
                        height="2.5rem"
                        data-testid="progressbar"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={flattenedColumns.length} align="center">
                  There&apos;s no data to show!
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={(theme) => (tableRowSx ? tableRowSx(row, theme) : {})}
                >
                  {flattenedColumns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      align={col.align || "center"}
                      {...col.props}
                    >
                      {getCellValue(row, col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Box display="flex" justifyContent="end">
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={finalTotalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
