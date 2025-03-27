import { DetailedIssue } from "../../../types/analyserResults";
import { ColumName } from "../enums/columnName";
import { Filters } from "../types/filter";

const filterByField = (
  data: DetailedIssue[],
  field: ColumName,
  filterValue: string
): DetailedIssue[] => {
  return data.filter((issue) => issue[field]?.toString().includes(filterValue));
};

export const applyFilter = (
  initialData: DetailedIssue[],
  filters: Filters
): DetailedIssue[] => {
  let filteredData = initialData;

  if (filters?.url) {
    filteredData = filterByField(filteredData, ColumName.Url, filters.url);
  }

  if (filters?.type) {
    filteredData = filterByField(filteredData, ColumName.Type, filters.type);
  }

  if (filters?.component) {
    filteredData = filterByField(
      filteredData,
      ColumName.Component,
      filters.component
    );
  }

  return filteredData;
};
