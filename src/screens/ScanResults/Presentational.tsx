import { useState } from 'react';

import ResultsTable from './components/ResultsTable/Presentational';
import SiteTree from './components/SiteTree/Presentational';
import { prepareAnalyserResults } from './helpers/prepareAnalyserResults';
import styles from './styles.module.scss';
import useGetAnalyserData from './hooks/useGetAnalyserData';
import { Spinner, VStack, Text, Center } from '@chakra-ui/react';

const ScanResults = () => {
  const { analyserData, loading } = useGetAnalyserData();
  const analyserResults = prepareAnalyserResults(analyserData);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  if (loading) {
    return (
      <Center h="100vh">
        <VStack colorPalette="teal">
          <Spinner color="#1F2937" />
          <Text color="#1F2937">Loading...</Text>
        </VStack>
      </Center>
    )
  }

  return (
    <section className={styles.container}>
      <SiteTree analyserResults={analyserResults} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <ResultsTable analyserResults={analyserResults} selectedCategory={selectedCategory} />
    </section>
  )
}

export default ScanResults
