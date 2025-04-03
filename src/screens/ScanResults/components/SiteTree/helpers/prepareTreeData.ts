import { TreeNode } from "../../../../../components/CostumeTree/types/treeNode";
import { AnalyserResults } from "../../../types/analyserResults";

export const prepareTreeData = (
  analyserResults: AnalyserResults
): TreeNode[] => {
  const categories = Object.keys(analyserResults);
  if (categories.length === 0) return [];

  const firstUrl = Object.values(analyserResults)
    .flat()
    .find((issue) => issue.url)?.url;

  const baseUrl = firstUrl ? new URL(firstUrl).hostname : "Unknown";

  return [
    {
      id: "root",
      label: "root",
      children: [
        {
          id: `root-${baseUrl}`,
          label: baseUrl,
          children: categories.map((category) => ({
            id: `root-${baseUrl}-${category}`,
            label: category,
          })),
        },
      ],
    },
  ];
};
