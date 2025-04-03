import mockData from "../../mocks/response.json";
import AnalyserResultsRes from "./types/analyserResultsRes";

export const getAnalyserResults = (): Promise<AnalyserResultsRes> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};
