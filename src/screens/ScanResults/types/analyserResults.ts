import { Issue } from "../../../types/analyserResultsRes";

export type DetailedIssue = Issue & {
  id: string;
  url: string;
};

export type AnalyserResults = Record<string, DetailedIssue[]>;
