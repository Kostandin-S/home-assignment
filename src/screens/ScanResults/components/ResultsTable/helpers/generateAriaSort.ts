import { ColumName } from "../enums/columnName";
import { SortConfig } from "../types/sorting";

export const generateAriaSort = (sortConfig: SortConfig, column: ColumName) => {
  if (sortConfig.column !== column) return "none";
  return sortConfig.direction === "asc" ? "ascending" : "descending";
};
