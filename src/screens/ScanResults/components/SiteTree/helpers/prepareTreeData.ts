import type { TreeDataNode } from "antd";

import { AnalyserResults } from "../../../types/analyserResults";

export const prepareTreeData = (
  analyserResults: AnalyserResults
): TreeDataNode[] => {
  const categories = Object.keys(analyserResults);
  if (categories.length === 0) return [];

  const firstUrl = Object.values(analyserResults)
    .flat()
    .find((issue) => issue.url)?.url;

  const baseUrl = firstUrl ? new URL(firstUrl).hostname : "Unknown";

  return [
    {
      title: "root",
      key: "root",
      children: [
        {
          title: baseUrl,
          key: `root-${baseUrl}`,
          children: categories.map((category) => ({
            title: category,
            key: `root-${baseUrl}-${category}`,
          })),
        },
      ],
    },
  ];
};
