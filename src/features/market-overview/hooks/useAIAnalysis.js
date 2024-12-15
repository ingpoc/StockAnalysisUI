import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { marketService } from '@/services/marketService';

export const useAIAnalysis = (symbol) => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchAnalyses = useCallback(async () => {
    if (!symbol) return;

    try {
      setIsLoading(true);
      setError(null);
      const analysesData = await marketService.getAnalysisHistory(symbol);
      setAnalyses(analysesData);

      // Select the latest analysis by default
      if (analysesData.length > 0) {
        const latestAnalysis = await marketService.getAnalysisContent(analysesData[0].id);
        setSelectedAnalysis(latestAnalysis);
      }
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
  }, [symbol, toast]);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  const selectAnalysis = async (analysisId) => {
    try {
      setIsLoading(true);
      setError(null);
      const analysis = await marketService.getAnalysisContent(analysisId);
      setSelectedAnalysis(analysis);
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
  };

  const refreshAnalysis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const newAnalysis = await marketService.refreshAnalysis(symbol);
      await fetchAnalyses();
      setSelectedAnalysis(newAnalysis);
      toast({
        title: "Success",
        description: "Analysis refreshed successfully",
      });
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
  };

  return {
    analyses,
    selectedAnalysis,
    isLoading,
    error,
    setSelectedAnalysis: selectAnalysis,
    refreshAnalysis
  };
};