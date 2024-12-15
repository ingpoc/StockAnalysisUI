import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { marketService } from '@/services/marketService';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const useMarketData = (selectedQuarter = '') => {
  const [data, setData] = useState(null);
  const [quarters, setQuarters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  
  // Use ref for cache to persist between renders
  const cache = useRef(new Map());
  const lastFetchTime = useRef(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    const cacheKey = `market-data-${selectedQuarter}`;
    
    try {
      // Check cache if not forcing refresh
      if (!forceRefresh && cache.current.has(cacheKey)) {
        const cachedData = cache.current.get(cacheKey);
        if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
          setData(cachedData.data);
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      // Fetch quarters if not loaded
      if (quarters.length === 0) {
        const quartersData = await marketService.getQuarters();
        setQuarters(quartersData);
      }

      // Fetch market data
      const marketData = await marketService.getMarketData(selectedQuarter, forceRefresh);
      
      // Update cache
      cache.current.set(cacheKey, {
        data: marketData,
        timestamp: Date.now()
      });

      setData(marketData);
      lastFetchTime.current = Date.now();
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedQuarter, quarters.length, toast]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto refresh setup
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(true);
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  const refreshData = useCallback(async () => {
    await fetchData(true);
    toast({
      title: "Success",
      description: "Data refreshed successfully",
    });
  }, [fetchData, toast]);

  return {
    data,
    quarters,
    isLoading,
    error,
    refreshData,
    lastUpdated: lastFetchTime.current
  };
};