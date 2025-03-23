"use client";

// React Aria imports--------------------------
import { Column, Table, TableBody, TableHeader } from "react-aria-components";
import { twMerge } from "tailwind-merge";

// ================== TYPES ================== //
interface TableType {
  label?: string;
  columns: {
    id: string;
    label?: string;
    width?: number;
  }[];
  subColumns?: {
    id: string;
    label: string;
  }[];
  children: JSX.Element;
  className?: string;
  headerClassName?: string;
  columnClassName?: string;
  firstColLeftAlign?: boolean;
  forSiteUnitParams?: boolean;
  style?: React.CSSProperties;
}

// ================== CLIENT COMPONENT ================== //
export default function MainTable({
  label,
  columns,
  children,
  className,
  columnClassName,
  headerClassName,
  firstColLeftAlign = false,
  forSiteUnitParams = false,
  style
}: TableType) {
  return (
    <Table
      aria-label={label ?? "master-parameters"}
      className={twMerge("w-full my-10  rounded-t-10 bg-gray-800 ", className ?? "")}
      style={style}
    >
      <TableHeader className={twMerge("bg-table_col h-11 bg-gray-700", headerClassName ?? "")}>
        {columns.map((col, index) => (
          <Column
            key={col.id}
            isRowHeader
            className={twMerge(
              index === 0 && "pl-3 rounded-tl-10 ",
              index === columns.length - 1 && "pr-3 rounded-tr-10",
              "text-left",
              columnClassName ?? "",
              firstColLeftAlign && index === 0 && "text-left",
              forSiteUnitParams && (index === 0 ? "pl-3" : "pl-1.5"),
              forSiteUnitParams && (index === columns.length - 1 ? "pr-3" : "pr-1.5"),
              forSiteUnitParams && index > 1 && "text-center"
            )}
            style={col.width ? { width: col.width } : undefined}
          >
            {col.label}
          </Column>
        ))}
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}
