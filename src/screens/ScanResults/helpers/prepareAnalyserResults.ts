import AnalyserResultsRes from "../../../types/analyserResultsRes";
import { AnalyserResults } from "../types/analyserResults";

export const prepareAnalyserResults = (
  analyserResultsRes: AnalyserResultsRes
): AnalyserResults =>
  Object.entries(analyserResultsRes).reduce<AnalyserResults>(
    (result, [url, issues]) => {
      const category = url.split("/")[3] || "other";

      if (!result[category]) {
        result[category] = [];
      }

      result[category].push(
        ...issues.map((issue) => ({
          id: `${category}-${issue.component}`,
          url,
          ...issue,
        }))
      );

      return result;
    },
    {}
  );
