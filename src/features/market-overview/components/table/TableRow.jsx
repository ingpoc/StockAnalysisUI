import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableCell,
  TableRow as TableRowUI,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Brain, BarChart2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatValue, getGrowthClass, getRecommendationClass } from '../../utils/formatters';

const TableRow = ({ stock, visibleColumns, onAnalysisClick }) => {
  const navigate = useNavigate();
  const growthClass = getGrowthClass(stock.net_profit_growth);
  
  const handleViewDetails = () => {
    navigate(`/stocks/${stock.symbol}`);
  };

  const renderEstimates = (estimates) => {
    if (!estimates || estimates === '--') return '--';
    
    const isBeating = estimates.toLowerCase().includes('beats');
    const percentage = estimates.split(':')[1]?.trim() || '';
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isBeating ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isBeating ? `+${percentage}` : percentage}
      </span>
    );
  };

  return (
    <TableRowUI className="group hover:bg-slate-50">
      {visibleColumns.company_name && (
        <TableCell className="font-medium">
          <button 
            onClick={handleViewDetails}
            className="hover:text-blue-600 hover:underline text-left"
          >
            {stock.company_name || '--'}
          </button>
        </TableCell>
      )}
      {visibleColumns.cmp && (
        <TableCell className="text-right tabular-nums">
          {formatValue(stock.cmp, 'currency')}
        </TableCell>
      )}
      {visibleColumns.net_profit_growth && (
        <TableCell className={`text-right tabular-nums ${growthClass}`}>
          {formatValue(stock.net_profit_growth, 'percentage')}
        </TableCell>
      )}
      {visibleColumns.strengths && (
        <TableCell className="text-center">
          <span className="text-green-600 font-semibold">
            {stock.strengths === "NA" ? "--" : stock.strengths}
          </span>
        </TableCell>
      )}
      {visibleColumns.weaknesses && (
        <TableCell className="text-center">
          <span className="text-red-600 font-semibold">
            {stock.weaknesses === "NA" ? "--" : stock.weaknesses}
          </span>
        </TableCell>
      )}
      {visibleColumns.piotroski_score && (
        <TableCell className="text-center font-medium">
          {stock.piotroski_score || '--'}
        </TableCell>
      )}
      {visibleColumns.estimates && (
        <TableCell className="text-center">
          {renderEstimates(stock.estimates)}
        </TableCell>
      )}
      {visibleColumns.result_date && (
        <TableCell className="text-right font-medium whitespace-nowrap">
          {stock.result_date || '--'}
        </TableCell>
      )}
      {visibleColumns.recommendation && (
        <TableCell>
          {stock.recommendation ? (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRecommendationClass(stock.recommendation)}`}>
              {stock.recommendation}
            </span>
          ) : '--'}
        </TableCell>
      )}
      <TableCell className="opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAnalysisClick(stock)}>
              <Brain className="h-4 w-4 mr-2" />
              View Analysis
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewDetails}>
              <BarChart2 className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRowUI>
  );
};

export default TableRow;