import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { CompanyOverview } from './components/CompanyOverview';
import { FinancialMetrics } from './components/FinancialMetrics';
import { QuarterlyResults } from './components/QuarterlyResults';
import { TechnicalIndicators } from './components/TechnicalIndicators';
import { api } from '@/services/api';

const StockDetails = () => {
  const { symbol } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching:', `/stock/${symbol}`);
        const json = await api.get(`/stock/${symbol}`);
        console.log('Response:', json);
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  console.log('Render data:', data);

  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
  if (loading) return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-24" />
      <div className="grid gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data?.stock?.company_name || '--'}</h1>
          <p className="text-gray-500">{symbol}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
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
          <QuarterlyResults data={data?.stock?.financial_metrics} />
        </TabsContent>
        <TabsContent value="technical">
          <TechnicalIndicators data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetails;