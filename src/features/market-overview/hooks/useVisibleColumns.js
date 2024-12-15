import { useState } from 'react';

export const useVisibleColumns = (defaultColumns) => {
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  return { visibleColumns, toggleColumn };
};