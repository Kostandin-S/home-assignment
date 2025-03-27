export type Issue = {
  type: string;
  severity: string;
  component: string;
  selector: string;
};

type AnalyserResultsRes = {
  [url: string]: Issue[];
};

export default AnalyserResultsRes;
