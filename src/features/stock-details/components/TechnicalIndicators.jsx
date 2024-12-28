import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";

const IndicatorCard = ({ title, value, change, icon: Icon }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center gap-1 ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {Math.abs(change)}%
            </p>
          )}
        </div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
    </CardContent>
  </Card>
);

export const TechnicalIndicators = ({ data = {} }) => {
  const indicators = [
    {
      title: 'RSI (14)',
      value: data.rsi || '--',
      change: data.rsi_change,
      icon: Activity
    },
    {
      title: 'MACD',
      value: data.macd || '--',
      change: data.macd_change,
      icon: BarChart3
    },
    {
      title: '50 Day MA',
      value: data.ma_50 ? `₹${data.ma_50}` : '--',
      change: data.ma_50_change,
      icon: TrendingUp
    },
    {
      title: '200 Day MA',
      value: data.ma_200 ? `₹${data.ma_200}` : '--',
      change: data.ma_200_change,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Technical Indicators
          </CardTitle>
        </CardHeader>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indicators.map(indicator => (
          <IndicatorCard key={indicator.title} {...indicator} />
        ))}
      </div>
    </div>
  );
};