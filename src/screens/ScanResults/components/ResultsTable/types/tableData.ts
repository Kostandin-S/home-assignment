import { ColumName } from "../enums/columnName";

export type TableData = {
  id: string;
  selector: string;
  [ColumName.Url]: string;
  [ColumName.Type]: string;
  [ColumName.Component]: string;
};
