import { useState, useMemo } from 'react';

export const useTablePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const pagination = {
    currentPage,
    totalPages,
    totalItems: data.length,
    itemsPerPage,
    setPage: setCurrentPage
  };

  return { paginatedData, pagination };
};