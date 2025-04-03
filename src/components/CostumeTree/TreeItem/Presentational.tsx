import React, { Dispatch, SetStateAction, useState } from "react";
import { List, Text, Box } from "@chakra-ui/react";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { TreeNode } from '../types/treeNode';

interface Props {
  node: TreeNode;
  onSelect?: (node: TreeNode) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>;
  defaultExpandAll?: boolean
}

const TreeItem: React.FC<Props> = ({
  node,
  onSelect,
  selectedNodeId,
  setSelectedNodeId,
  defaultExpandAll
}) => {
  const [expanded, setExpanded] = useState(defaultExpandAll || false);

  return (
    <List.Item
      role="tree-item"
      cursor="pointer"
      width="max-content"
      tabIndex={0}
      p={0.5}
      aria-expanded={node.children ? expanded : undefined}
      bg={selectedNodeId === node.id ? "blue.100" : "transparent"}
    >
      <Box display="flex">
        {node.children && (
          <List.Indicator
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Collapse" : "Expand"}
            aria-controls={node.id}
            mr={2}
          >
            {expanded ? <BiChevronDown size={18} /> : <BiChevronRight size={18} />}
          </List.Indicator>
        )}
        <Text
          textStyle="sm"
          onClick={() => {
            onSelect?.(node)
            setSelectedNodeId(node.id);
          }}
        >
          {node.label}
        </Text>
      </Box>

      {expanded && node.children && (
        <List.Root role="children" id={node.id} pl={6} mt={1} listStyleType="none">
          {node.children.map((child) => (
            <TreeItem
              key={child.id} node={child}
              onSelect={onSelect}
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={setSelectedNodeId}
              defaultExpandAll={defaultExpandAll}
            />
          ))}
        </List.Root>
      )}
    </List.Item>
  );
};

export default TreeItem
