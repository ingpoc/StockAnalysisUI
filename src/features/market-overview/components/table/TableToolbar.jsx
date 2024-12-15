import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, Settings } from "lucide-react";

const TableToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  onExport, 
  visibleColumns, 
  onToggleColumn 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(visibleColumns).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onToggleColumn(key)}
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => {}}
                  className="mr-2"
                />
                {key.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TableToolbar;