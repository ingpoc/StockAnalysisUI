import React from 'react';
import { Table, TableBody } from "@/components/ui/table";
import TableToolbar from './table/TableToolbar';
import TableHeader from './table/TableHeader';
import TableRow from './table/TableRow';
import TablePagination from './table/TablePagination';
import TableSkeleton from './table/TableSkeleton';
import { useTableSort } from '../hooks/useTableSort';
import { useTableSearch } from '../hooks/useTableSearch';
import { useTablePagination } from '../hooks/useTablePagination';
import { useVisibleColumns } from '../hooks/useVisibleColumns';
import * as XLSX from 'xlsx';

const defaultColumns = {
  company_name: true,
  cmp: true,
  net_profit_growth: true,
  strengths: true,
  weaknesses: true,
  piotroski_score: true,
  estimates: true,
  result_date: true,
  recommendation: true
};

const StockTable = ({ data, isLoading, onAIAnalysisClick }) => {
  const { sortedData, sortConfig, handleSort } = useTableSort(data);
  const { filteredData, searchTerm, setSearchTerm } = useTableSearch(sortedData);
  const { paginatedData, pagination } = useTablePagination(filteredData);
  const { visibleColumns, toggleColumn } = useVisibleColumns(defaultColumns);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Market Data');
    XLSX.writeFile(wb, 'market_data.xlsx');
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <TableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={exportToExcel}
        visibleColumns={visibleColumns}
        onToggleColumn={toggleColumn}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader
            visibleColumns={visibleColumns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <TableBody>
            {paginatedData.map((stock) => (
              <TableRow
                key={stock.symbol}
                stock={stock}
                visibleColumns={visibleColumns}
                onAnalysisClick={onAIAnalysisClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination {...pagination} />
    </div>
  );
};

export default StockTable;