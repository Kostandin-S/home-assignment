import Table, { ColumnProps } from 'antd/es/table';
import { FaSearch } from "react-icons/fa";

import { TableData } from './types/tableData';
import { ColumName } from './enums/columnName';
import styles from './styles.module.scss';
import { AnalyserResults } from '../../types/analyserResults';
import CardContainer from '../../../../components/CardContainer/Presentational';
import { Input } from 'antd';
import { useState } from 'react';
import { Filters } from './types/filter';
import { applyFilter } from './helpers/applyFilter';

interface Props {
  analyserResults: AnalyserResults;
  selectedCategory: string | undefined;
}

const ResultsTable: React.FC<Props> = ({ analyserResults, selectedCategory }) => {
  const { Search } = Input;

  const [filters, setFilters] = useState<Filters>({
    [ColumName.Url]: undefined,
    [ColumName.Type]: undefined,
    [ColumName.Component]: undefined,
  });

  const initialData = selectedCategory ? analyserResults[selectedCategory] : [];
  const filteredTableData = applyFilter(initialData, filters)

  const renderFilterDropdown = (placeholder: string, columnKey: ColumName) => ({ confirm }: { confirm: () => void }) => (
    <Search
      placeholder={placeholder}
      className={styles.search}
      onSearch={(searchTerm) => {
        setFilters((prevState) => ({ ...prevState, [columnKey]: searchTerm }));
        confirm();
      }}
      allowClear
      enterButton
    />
  );

  const columns: ColumnProps<TableData>[] = [
    {
      title: 'Url',
      width: '50%',
      dataIndex: ColumName.Url,
      render: (value: string) => <a href={value} target='_blank' rel="noopener noreferrer">{value}</a>,
      sorter: (a, b) => a[ColumName.Url].localeCompare(b[ColumName.Url]),
      filterIcon: <FaSearch />,
      filteredValue: filters[ColumName.Url] ? [filters[ColumName.Url]] : [],
      filterDropdown: renderFilterDropdown('Filter by URL', ColumName.Url),
    },
    {
      title: 'Type',
      dataIndex: ColumName.Type,
      sorter: (a, b) => a[ColumName.Type].localeCompare(b[ColumName.Type]),
      filterIcon: <FaSearch />,
      filteredValue: filters[ColumName.Type] ? [filters[ColumName.Type]] : [],
      filterDropdown: renderFilterDropdown('Filter by Type', ColumName.Type),
    },
    {
      title: 'Component',
      dataIndex: ColumName.Component,
      sorter: (a, b) => a[ColumName.Component].localeCompare(b[ColumName.Component]),
      filterIcon: <FaSearch />,
      filteredValue: filters[ColumName.Component] ? [filters[ColumName.Component]] : [],
      filterDropdown: renderFilterDropdown('Filter by Component', ColumName.Component),
    }
  ];

  return (
    <CardContainer title={selectedCategory} childStyles={styles.container}>
      <Table
        dataSource={filteredTableData}
        columns={columns}
        rowKey={(row) => row.id}
        expandable={{
          expandedRowRender: (record) => <p className={styles.selector}>Selector: {record.selector}</p>
        }}
        scroll={{ y: 200 }}
      />
    </CardContainer>
  )
};

export default ResultsTable;
