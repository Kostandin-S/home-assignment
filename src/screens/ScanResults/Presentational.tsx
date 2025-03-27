import { useState } from 'react';

import response from '../../mocks/response.json';
import ResultsTable from './components/ResultsTable/Presentational';
import SiteTree from './components/SiteTree/Presentational';
import { prepareAnalyserResults } from './helpers/prepareAnalyserResults';
import styles from './styles.module.scss';

const ScanResults = () => {
  const analyserResults = prepareAnalyserResults(response);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  return (
    <div className={styles.container}>
      <SiteTree analyserResults={analyserResults} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <ResultsTable analyserResults={analyserResults} selectedCategory={selectedCategory} />
    </div>
  )
}

export default ScanResults
