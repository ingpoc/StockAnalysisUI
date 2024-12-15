import React from 'react';
import { TableHead, TableHeader as TableHeaderUI, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const TableHeader = ({ visibleColumns, sortConfig, onSort }) => {
  const getSortIcon = (column) => {
    if (sortConfig.key === column) {
      return <ArrowUpDown className={`ml-2 h-4 w-4 ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100" />;
  };

  const renderSortableHeader = (title, column, align = 'left') => (
    <Button
      variant="ghost"
      size="sm"
      className={`-ml-4 h-8 font-semibold group hover:bg-transparent text-${align} w-full justify-${align}`}
      onClick={() => onSort(column)}
    >
      {title}
      {getSortIcon(column)}
    </Button>
  );

  return (
    <TableHeaderUI>
      <TableRow>
        {visibleColumns.company_name && (
          <TableHead className="font-semibold">
            {renderSortableHeader('Company', 'company_name')}
          </TableHead>
        )}
        {visibleColumns.cmp && (
          <TableHead className="text-right">
            {renderSortableHeader('CMP', 'cmp', 'right')}
          </TableHead>
        )}
        {visibleColumns.net_profit_growth && (
          <TableHead className="text-right">
            {renderSortableHeader('Net Profit Growth', 'net_profit_growth', 'right')}
          </TableHead>
        )}
        {visibleColumns.strengths && (
          <TableHead className="text-center">
            {renderSortableHeader('Strengths', 'strengths', 'center')}
          </TableHead>
        )}
        {visibleColumns.weaknesses && (
          <TableHead className="text-center">
            {renderSortableHeader('Weaknesses', 'weaknesses', 'center')}
          </TableHead>
        )}
        {visibleColumns.piotroski_score && (
          <TableHead className="text-center">
            {renderSortableHeader('Piotroski Score', 'piotroski_score', 'center')}
          </TableHead>
        )}
        {visibleColumns.estimates && (
          <TableHead className="text-center">
            {renderSortableHeader('Estimates', 'estimates', 'center')}
          </TableHead>
        )}
        {visibleColumns.result_date && (
          <TableHead className="text-right">
            {renderSortableHeader('Result Date', 'result_date', 'right')}
          </TableHead>
        )}
        {visibleColumns.recommendation && (
          <TableHead>
            {renderSortableHeader('Recommendation', 'recommendation')}
          </TableHead>
        )}
        <TableHead className="w-[50px]"></TableHead>
      </TableRow>
    </TableHeaderUI>
  );
};

export default TableHeader;