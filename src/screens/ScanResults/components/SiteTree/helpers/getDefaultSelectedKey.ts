import { TreeDataNode } from "antd";

const getDefaultSelectedKey = (treeData: TreeDataNode[]) => {
  const rootNode = treeData[0];

  if (!rootNode?.children?.length) return [];

  const urlNode = rootNode.children[0];

  if (!urlNode?.children?.length) return [];

  return [urlNode.children[0].key];
};

export default getDefaultSelectedKey;
