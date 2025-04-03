import { TreeNode } from "../../../../../components/CostumeTree/types/treeNode";

export const getDefaultSelectedNode = (
  treeData: TreeNode[]
): TreeNode | null => {
  if (!treeData?.length) return null;

  let currentNode = treeData[0];

  while (currentNode.children && currentNode.children.length > 0) {
    currentNode = currentNode.children[0];
  }

  return currentNode;
};
