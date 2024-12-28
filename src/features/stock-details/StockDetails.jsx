import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyOverview } from './components/CompanyOverview';
import { FinancialMetrics } from './components/FinancialMetrics';
import { QuarterlyResults } from './components/QuarterlyResults';
import { TechnicalIndicators } from './components/TechnicalIndicators';
import { useStockDetails } from './hooks/useStockDetails';

const StockDetails = () => {
  const { symbol } = useParams();
  const { data, loading, error } = useStockDetails(symbol);

  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array(4).fill(null).map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium">Error Loading Stock Details</h3>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stockData = data?.stock || {};
  const metrics = data?.formatted_metrics || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{stockData.company_name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {stockData.symbol}
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly Results</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <CompanyOverview data={data} />
        </TabsContent>

        <TabsContent value="financials">
          <FinancialMetrics data={data} />
        </TabsContent>

        <TabsContent value="quarterly">
          <QuarterlyResults data={data} />
        </TabsContent>

        <TabsContent value="technical">
          <TechnicalIndicators data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetails;