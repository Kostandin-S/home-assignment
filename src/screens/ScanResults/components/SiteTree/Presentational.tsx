import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Tree, Input } from 'antd';

import { prepareTreeData } from './helpers/prepareTreeData';
import { AnalyserResults } from '../../types/analyserResults';
import getDefaultSelectedKey from './helpers/getDefaultSelectedKey';
import styles from './styles.module.scss';
import CardContainer from '../../../../components/CardContainer/Presentational';
import { useSiteTreeFilter } from './hooks/useSiteTreeFilter';

interface Props {
  analyserResults: AnalyserResults;
  setSelectedCategory: Dispatch<SetStateAction<string | undefined>>;
  selectedCategory: string | undefined;
}

const SiteTree: React.FC<Props> = ({ analyserResults, setSelectedCategory, selectedCategory }) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const treeData = useMemo(() => prepareTreeData(analyserResults), [analyserResults]);
  const defaultKey = useMemo(() => getDefaultSelectedKey(treeData), [treeData]);

  const { Search } = Input;

  useEffect(() => {
    if (treeData.length > 0 && !selectedCategory) {
      const defaultCategory = defaultKey[0].toString().split("-")[2];
      setSelectedCategory(defaultCategory);
    }
  }, [defaultKey, selectedCategory, setSelectedCategory, treeData]);

  const filteredTreeData = useSiteTreeFilter(treeData, searchTerm);

  return (
    <CardContainer title="Site Tree" childStyles={styles.container}>
      <Search
        placeholder='Search site'
        className={styles.search}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Tree
        treeData={filteredTreeData}
        onSelect={(_, info) => setSelectedCategory(String(info.node.title) || undefined)}
        defaultSelectedKeys={defaultKey}
        defaultExpandAll
        showLine
      />
    </CardContainer>
  )
}

export default SiteTree;
