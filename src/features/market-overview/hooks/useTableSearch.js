import { useState, useMemo } from 'react';

export const useTableSearch = (data, searchFields = ['company_name', 'symbol']) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => 
      searchFields.some(field => 
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchFields]);

  return { filteredData, searchTerm, setSearchTerm };
};