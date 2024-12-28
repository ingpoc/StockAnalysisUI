import { useState, useEffect } from 'react';
import { marketService } from '@/services/marketService';

export const useStockDetails = (symbol) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockDetails = async (symbol) => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);
      const data = await marketService.getStockDetails(symbol);
      setData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stock details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchStockDetails(symbol);
    }
  }, [symbol]);

  const refresh = () => symbol && fetchStockDetails(symbol);

  return { data, loading, error, refresh };
};