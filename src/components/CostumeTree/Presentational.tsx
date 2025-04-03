import React, { useState } from "react";
import { List } from "@chakra-ui/react";
import { TreeNode } from './types/treeNode';
import TreeItem from './TreeItem/Presentational';

interface Props {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  defaultExpandAll?: boolean;
  defaultSelectedNodeId?: string | null;
}

const CustomTree: React.FC<Props> = ({ data, onSelect, defaultExpandAll, defaultSelectedNodeId }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(defaultSelectedNodeId || null);

  return (
    <List.Root role="tree" listStyleType="none">
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          onSelect={onSelect}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          defaultExpandAll={defaultExpandAll}
        />
      ))}
    </List.Root>
  );
};

export default CustomTree;
