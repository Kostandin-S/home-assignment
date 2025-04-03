import { useEffect, useState } from "react";
import AnalyserResultsRes from "../../../api/requests/types/analyserResultsRes";
import { getAnalyserResults } from "../../../api/requests/getAnalyserResults";

const useGetAnalyserData = () => {
  const [analyserData, setAnalyserData] = useState<AnalyserResultsRes>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchAnalyserData = async () => {
      try {
        const data = await getAnalyserResults();
        setAnalyserData(data);
      } catch (error) {
        console.error("Error fetching tree data:", error);
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    if (!analyserData) {
      fetchAnalyserData();
    }
  }, [analyserData]);

  return { error, loading, analyserData };
};

export default useGetAnalyserData;
