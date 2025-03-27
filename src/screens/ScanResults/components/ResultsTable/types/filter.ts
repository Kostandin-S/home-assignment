import { ColumName } from "../enums/columnName";

export type Filters = {
  [ColumName.Url]?: string;
  [ColumName.Type]?: string;
  [ColumName.Component]?: string;
};
