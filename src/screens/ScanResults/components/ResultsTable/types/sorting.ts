import { ColumName } from "../enums/columnName";

export type SortConfig = {
  column: ColumName | null;
  direction: "asc" | "desc" | null;
};
