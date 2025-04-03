import { useMemo } from "react";
import { TreeNode } from "../../../../../components/CostumeTree/types/treeNode";

const filterTreeNodes = (nodes: TreeNode[], searchTerm: string): TreeNode[] => {
  if (!searchTerm) return nodes;

  return nodes
    .map((node) => {
      const nodeTitle = String(node.label || "");
      const nodeMatches = nodeTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const filteredChildren = node.children
        ? filterTreeNodes(node.children, searchTerm)
        : [];

      if (nodeMatches || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    })
    .filter(Boolean) as TreeNode[];
};

export const useSiteTreeFilter = (
  treeData: TreeNode[],
  searchTerm?: string
) => {
  return useMemo(
    () => filterTreeNodes(treeData, searchTerm ?? ""),
    [treeData, searchTerm]
  );
};
