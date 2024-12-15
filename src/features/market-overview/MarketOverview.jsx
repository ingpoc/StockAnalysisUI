import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart2, Clock, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import StockTable from './components/StockTable';
import AIAnalysisModal from './components/AIAnalysisModal';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingOverview } from './components/LoadingOverview';
import { useMarketData } from './hooks/useMarketData';

const MarketOverview = () => {
  const { toast } = useToast();
  const [selectedQuarter, setSelectedQuarter] = React.useState('');
  const [isAIModalOpen, setIsAIModalOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = React.useState(null);

  const {
    data,
    quarters,
    isLoading,
    error: dataError,
    refreshData,
    lastUpdated
  } = useMarketData(selectedQuarter);

  const handleQuarterChange = (value) => {
    setSelectedQuarter(value);
  };

  const handleRefresh = async () => {
    try {
      await refreshData();
      toast({
        title: "Refreshed",
        description: "Market data has been updated successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAIAnalysisClick = (stock) => {
    setSelectedStock(stock);
    setIsAIModalOpen(true);
  };

  const handleRetry = () => {
    refreshData();
  };

  if (isLoading) {
    return <LoadingOverview />;
  }

  if (dataError) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Error Loading Data</CardTitle>
            <CardDescription>{dataError.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRetry}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const lastUpdateTime = lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never';

  return (
    <ErrorBoundary onRetry={handleRetry}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Market Overview</h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive view of market performance and stock analysis
              {lastUpdated && (
                <span className="ml-2">• Last updated: {lastUpdateTime}</span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select
              value={selectedQuarter}
              onValueChange={handleQuarterChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select quarter" />
              </SelectTrigger>
              <SelectContent>
                {quarters.map((quarter) => (
                  <SelectItem key={quarter} value={quarter}>
                    {quarter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleRefresh} disabled={isLoading}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="top" className="space-y-4">
          <TabsList>
            <TabsTrigger value="top" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Top Performers
            </TabsTrigger>
            <TabsTrigger value="worst" className="flex items-center">
              <TrendingDown className="mr-2 h-4 w-4" />
              Worst Performers
            </TabsTrigger>
            <TabsTrigger value="latest" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Latest Results
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              All Stocks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Stocks with the highest net profit growth in {selectedQuarter || 'the latest quarter'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockTable 
                  data={data?.top_performers || []}
                  isLoading={isLoading}
                  onAIAnalysisClick={handleAIAnalysisClick}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="worst">
            <Card>
              <CardHeader>
                <CardTitle>Worst Performers</CardTitle>
                <CardDescription>
                  Stocks with the lowest net profit growth in {selectedQuarter || 'the latest quarter'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockTable 
                  data={data?.worst_performers || []}
                  isLoading={isLoading}
                  onAIAnalysisClick={handleAIAnalysisClick}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="latest">
            <Card>
              <CardHeader>
                <CardTitle>Latest Results</CardTitle>
                <CardDescription>
                  Most recently announced quarterly results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockTable 
                  data={data?.latest_results || []}
                  isLoading={isLoading}
                  onAIAnalysisClick={handleAIAnalysisClick}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Stocks</CardTitle>
                <CardDescription>
                  Complete overview of all stocks in {selectedQuarter || 'the latest quarter'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockTable 
                  data={data?.all_stocks || []}
                  isLoading={isLoading}
                  onAIAnalysisClick={handleAIAnalysisClick}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AIAnalysisModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          stock={selectedStock}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MarketOverview;