import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { prepareTreeData } from './helpers/prepareTreeData';
import { AnalyserResults } from '../../types/analyserResults';
import { getDefaultSelectedNode } from './helpers/getDefaultSelectedNode';
import styles from './styles.module.scss';
import CardContainer from '../../../../components/CardContainer/Presentational';
import { useSiteTreeFilter } from './hooks/useSiteTreeFilter';
import CustomTree from '../../../../components/CostumeTree/Presentational';
import { Input, InputGroup } from '@chakra-ui/react';
import { TreeNode } from '../../../../components/CostumeTree/types/treeNode';

interface Props {
  analyserResults: AnalyserResults;
  setSelectedCategory: Dispatch<SetStateAction<string | undefined>>;
  selectedCategory: string | undefined;
}

const SiteTree: React.FC<Props> = ({ analyserResults, setSelectedCategory, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const treeData = useMemo(() => prepareTreeData(analyserResults), [analyserResults]);
  const defaultSelectedNode = useMemo(() => getDefaultSelectedNode(treeData), [treeData]);

  useEffect(() => {
    if (treeData.length > 0 && !selectedCategory) {
      setSelectedCategory(defaultSelectedNode?.label);
    }
  }, [defaultSelectedNode?.label, selectedCategory, setSelectedCategory, treeData.length]);

  const filteredTreeData = useSiteTreeFilter(treeData, searchTerm);

  return (
    <CardContainer title="Site Tree" childStyles={styles.container}>
      <InputGroup endElement={<FaSearch />} mb={2}>
        <Input
          placeholder="Search site"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search site"
        />
      </InputGroup>
      <CustomTree
        data={filteredTreeData}
        defaultExpandAll
        onSelect={(node: TreeNode) => setSelectedCategory(node?.label)}
        defaultSelectedNodeId={defaultSelectedNode?.id}
      />
    </CardContainer>
  )
}

export default SiteTree;
