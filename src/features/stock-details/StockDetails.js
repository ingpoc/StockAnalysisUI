import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, Activity, BarChart3, AlertCircle, LineChart } from 'lucide-react';

const MetricCard = ({ title, value, subtitle, icon: Icon, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value || '--'}</h3>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className={`rounded-full p-2 ${trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-gray-100'}`}>
          {Icon && <Icon className={`h-5 w-5 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`} />}
        </div>
      </div>
    </CardContent>
  </Card>
);

const GrowthIndicator = ({ value }) => {
  const numValue = parseFloat(value);
  const isPositive = numValue > 0;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
      isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {value}%
    </span>
  );
};

const StockDetails = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/stock/${symbol}`);
        if (!response.ok) throw new Error('Failed to fetch stock data');
        const data = await response.json();
        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (symbol) {
      fetchStockData();
    }
  }, [symbol]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
  
  if (error) return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>Error: {error}</AlertDescription>
    </Alert>
  );

  if (!stockData?.stock) return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>No data available for {symbol}</AlertDescription>
    </Alert>
  );

  const { formatted_metrics } = stockData;
  const metrics = stockData.stock.financial_metrics[0] || {};

  const getTrend = (value) => {
    if (!value) return 'neutral';
    return value.includes('-') ? 'down' : 'up';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{formatted_metrics.company_name}</h1>
          <p className="text-lg text-muted-foreground">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">₹{formatted_metrics.cmp}</p>
          <GrowthIndicator value={formatted_metrics.net_profit_growth} />
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Piotroski Score"
          value={formatted_metrics.piotroski_score}
          subtitle="Overall Quality Score"
          icon={Activity}
          trend={getTrend(metrics.piotroski_score)}
        />
        <MetricCard
          title="Book Value"
          value={metrics.book_value}
          subtitle="Per Share"
          icon={BarChart3}
          trend={getTrend(metrics.book_value)}
        />
        <MetricCard
          title="Revenue Growth"
          value={metrics.revenue_growth_3yr_cagr}
          subtitle="3Y CAGR"
          icon={TrendingUp}
          trend={getTrend(metrics.revenue_growth_3yr_cagr)}
        />
        <MetricCard
          title="Operating Profit Growth"
          value={metrics.operating_profit_growth_3yr_cagr}
          subtitle="3Y CAGR"
          icon={LineChart}
          trend={getTrend(metrics.operating_profit_growth_3yr_cagr)}
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Financial Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Financial Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Revenue', value: metrics.revenue },
                { label: 'Gross Profit', value: metrics.gross_profit },
                { label: 'Net Profit', value: metrics.net_profit }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value || '--'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Growth Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Revenue Growth', value: metrics.revenue_growth },
                { label: 'Gross Profit Growth', value: metrics.gross_profit_growth },
                { label: 'Net Profit Growth', value: metrics.net_profit_growth }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <GrowthIndicator value={item.value || '0'} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">Strengths</span>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-100 text-green-800">
                  {formatted_metrics.strengths}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">Weaknesses</span>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-red-100 text-red-800">
                  {formatted_metrics.weaknesses}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis */}
      {formatted_metrics.recommendation && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Analysis & Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{formatted_metrics.recommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockDetails;