import { DetailedIssue } from "../../../types/analyserResults";
import { SortConfig } from "../types/sorting";

export const applySorting = (
  detailedIssues: DetailedIssue[],
  sortConfig: SortConfig
) =>
  detailedIssues.sort((a, b) => {
    if (!sortConfig.column || !sortConfig.direction) return 0;
    const prop = sortConfig.column;
    const order = sortConfig.direction === "asc" ? 1 : -1;
    return a[prop].localeCompare(b[prop]) * order;
  });
