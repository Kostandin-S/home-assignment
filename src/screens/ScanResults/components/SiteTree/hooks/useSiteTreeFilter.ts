import { TreeDataNode } from "antd";
import { useMemo } from "react";

const filterTreeNodes = (
  nodes: TreeDataNode[],
  searchTerm: string
): TreeDataNode[] => {
  if (!searchTerm) return nodes;

  return nodes
    .map((node) => {
      const nodeTitle = String(node.title || "");
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
    .filter(Boolean) as TreeDataNode[];
};

export const useSiteTreeFilter = (
  treeData: TreeDataNode[],
  searchTerm?: string
) => {
  return useMemo(
    () => filterTreeNodes(treeData, searchTerm ?? ""),
    [treeData, searchTerm]
  );
};
