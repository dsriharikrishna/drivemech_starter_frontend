"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface TableColumn<T> {
  key: string;
  header: string;
  width?: string; // e.g., "200px", "20%", "auto"
  minWidth?: string;
  flex?: number; // Use flex for flexible width (e.g., flex: 1)
  resizable?: boolean; // Enable column resizing
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string | number;

  // Pagination
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;

  // Styling
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  allowOverflow?: boolean; // New prop to allow overflow-visible

  // Loading & Empty States
  loading?: boolean;
  emptyMessage?: string;

  // Selection
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selected: Set<string | number>) => void;

  // Sorting
  onSort?: (key: string, direction: "asc" | "desc") => void;

  // Row Interaction
  onRowClick?: (item: T) => void;

  // Custom Styling
  className?: string;
  style?: React.CSSProperties;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  pagination = false,
  pageSize = 10,
  currentPage: controlledPage,
  onPageChange,
  totalItems,
  striped = true,
  hoverable = true,
  bordered = false,
  compact = false,
  allowOverflow = false,
  loading = false,
  emptyMessage = "No data available",
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  onSort,
  onRowClick,
  className = "",
  style = {},
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Column resize state
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const tableRef = useRef<HTMLDivElement>(null);

  const currentPage =
    controlledPage !== undefined ? controlledPage : internalPage;
  const total = totalItems !== undefined ? totalItems : data.length;

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pagination ? data.slice(startIndex, endIndex) : data;
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page: number) => {
    if (controlledPage === undefined) {
      setInternalPage(page);
    }
    onPageChange?.(page);
  };

  const handleSort = (key: string) => {
    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDirection(newDirection);
    onSort?.(key, newDirection);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      onSelectionChange?.(new Set());
    } else {
      const allKeys = new Set(
        paginatedData.map((item, index) => keyExtractor(item, index))
      );
      onSelectionChange?.(allKeys);
    }
  };

  const handleSelectRow = (key: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    onSelectionChange?.(newSelected);
  };

  // Column resize handlers
  const handleResizeStart = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    const th = (e.target as HTMLElement).closest("th");
    if (th) {
      setResizingColumn(columnKey);
      setStartX(e.clientX);
      setStartWidth(th.offsetWidth);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizingColumn) {
        const diff = e.clientX - startX;
        const newWidth = Math.max(50, startWidth + diff); // Minimum 50px
        setColumnWidths((prev) => ({
          ...prev,
          [resizingColumn]: newWidth,
        }));
      }
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    if (resizingColumn) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizingColumn, startX, startWidth]);

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white overflow-visible">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>
            Showing {startIndex + 1} to {Math.min(endIndex, total)} of {total}{" "}
            results
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* First Page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsLeft size={18} />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                                px-3 py-1 rounded-lg transition-colors
                                ${page === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
                }
                            `}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Page */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Last Page */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full flex flex-col ${allowOverflow ? "overflow-visible" : "overflow-hidden"} ${className}`}
      style={style}
    >
      {/* Table Container - Responsive */}
      <div
        className={`flex-1 ${allowOverflow ? "overflow-visible" : "overflow-auto"} rounded-lg border border-gray-200`}
      >
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th
                  className={`sticky top-0 z-10 bg-gray-50 ${compact ? "px-3 py-2" : "px-4 py-3"} text-left border-b border-gray-200`}
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  style={{
                    width: columnWidths[column.key]
                      ? `${columnWidths[column.key]}px`
                      : column.width,
                    minWidth: column.minWidth,
                    flex: column.flex,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}
                  className={`
                                        bg-gray-50 border-b border-gray-200
                                        ${compact ? "px-3 py-2" : "px-4 py-3"}
                                        text-${column.align || "left"}
                                        text-xs font-semibold text-gray-800 uppercase tracking-wider
                                        ${column.sortable ? "cursor-pointer hover:bg-gray-100" : ""}
                                    `}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortKey === column.key && (
                      <span className="text-blue-500">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>

                  {/* Resize Handle */}
                  {column.resizable && (
                    <div
                      onMouseDown={(e) => handleResizeStart(e, column.key)}
                      className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 group"
                      style={{ userSelect: "none" }}
                    >
                      <div className="w-full h-full group-hover:bg-blue-500 transition-colors" />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const rowKey = keyExtractor(item, index);
                const isSelected = selectedRows.has(rowKey);

                return (
                  <tr
                    key={rowKey}
                    onClick={() => onRowClick?.(item)}
                    className={`
                                            ${striped && index % 2 === 1 ? "bg-gray-50" : ""}
                                            ${hoverable ? "hover:bg-gray-100" : ""}
                                            ${isSelected ? "bg-blue-50" : ""}
                                            ${onRowClick ? "cursor-pointer" : ""}
                                            transition-colors
                                        `}
                  >
                    {selectable && (
                      <td className={`${compact ? "px-3 py-2" : "px-4 py-3"}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowKey)}
                          className="rounded border-gray-300"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        style={{
                          width: columnWidths[column.key]
                            ? `${columnWidths[column.key]}px`
                            : column.width,
                          minWidth: column.minWidth,
                          flex: column.flex,
                        }}
                        className={`
                                                    ${compact ? "px-3 py-2" : "px-4 py-3"}
                                                    text-${column.align || "left"}
                                                    text-sm text-gray-900
                                                `}
                      >
                        {column.render
                          ? column.render(item, index)
                          : String((item as any)[column.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !loading && renderPagination()}
    </div>
  );
}

export default Table;
