import { Issue } from "../../../api/requests/types/analyserResultsRes";

export type DetailedIssue = Issue & {
  id: string;
  url: string;
};

export type AnalyserResults = Record<string, DetailedIssue[]>;
