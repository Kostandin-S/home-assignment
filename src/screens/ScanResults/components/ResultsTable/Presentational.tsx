import { useMemo, useState } from "react";
import { FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { RxExternalLink } from "react-icons/rx";
import {
  Table,
  Input,
  InputGroup,
  Link,
  Box
} from "@chakra-ui/react";
import CardContainer from "../../../../components/CardContainer/Presentational";
import { AnalyserResults } from "../../types/analyserResults";
import { ColumName } from "./enums/columnName";
import styles from "./styles.module.scss";
import { Filters } from "./types/filter";
import { applyFilter } from "./helpers/applyFilter";
import { SortConfig } from './types/sorting';
import { applySorting } from './helpers/applySorting';
import { generateAriaSort } from './helpers/generateAriaSort';

interface Props {
  analyserResults: AnalyserResults;
  selectedCategory: string | undefined;
}

const ResultsTable: React.FC<Props> = ({ analyserResults, selectedCategory }) => {
  const [filters, setFilters] = useState<Filters>({
    [ColumName.Url]: "",
    [ColumName.Type]: "",
    [ColumName.Component]: "",
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: null,
  });

  const renderSortIcon = (column: ColumName) => {
    if (sortConfig.column !== column) return <FaSort className={`${styles.sortIcon} ${styles.noActiveSorting}`} />;
    return sortConfig.direction === "asc" ? <FaSortUp className={styles.sortIcon} /> : <FaSortDown className={styles.sortIcon} />;
  };

  const handleSort = (column: ColumName) => {
    setSortConfig(({ column: prevColumn, direction: prevDirection }) => {
      const sortingDirection = prevDirection === "asc" ? "desc" : "asc"

      return {
        column: prevColumn === column && prevDirection === "desc" ? null : column,
        direction: prevColumn === column ? sortingDirection : "asc",
      }
    });
  };

  const sortedData = useMemo(() => {
    const initialData = selectedCategory ? analyserResults[selectedCategory] : [];
    return applySorting(applyFilter(initialData, filters), sortConfig);
  }, [selectedCategory, analyserResults, filters, sortConfig]);

  return (
    <CardContainer title={selectedCategory} childStyles={styles.container}>
      <Table.ScrollArea borderWidth="1px" rounded="md" height="300px">
        <Table.Root size="md" interactive stickyHeader>
          <Table.Header>
            <Table.Row>
              {Object.values(ColumName).map((column) => (
                <Table.ColumnHeader
                  key={column}
                  onClick={() => handleSort(column)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSort(column)
                    }
                  }}
                  cursor="pointer"
                  aria-sort={generateAriaSort(sortConfig, column)}
                  tabIndex={0}
                >
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    {column}
                    {renderSortIcon(column)}
                  </Box>
                </Table.ColumnHeader>
              ))}
            </Table.Row>

            <Table.Row>
              {Object.values(ColumName).map((column) => (
                <Table.ColumnHeader key={`${column}-filter`}>
                  <InputGroup endElement={<FaSearch />}>
                    <Input
                      placeholder={`Search ${column}`}
                      value={filters[column] || ""}
                      onChange={(e) => setFilters((prev) => ({ ...prev, [column]: e.target.value }))}
                      aria-label={`Search ${column}`}
                    />
                  </InputGroup>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sortedData.map((data) => (
              <Table.Row key={data.id}>
                <Table.Cell tabIndex={0}>
                  <Link href={data.url} colorPalette="blue" rel="noopener noreferrer" aria-label={`Visit ${data.url}, which has accessibility issues`}>
                    {data.url} <RxExternalLink />
                  </Link>
                </Table.Cell>
                <Table.Cell tabIndex={0}>{data.type}</Table.Cell>
                <Table.Cell tabIndex={0}>{data.component}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </CardContainer>
  );
};

export default ResultsTable;
