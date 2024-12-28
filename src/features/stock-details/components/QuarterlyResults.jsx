import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from "lucide-react";

export const QuarterlyResults = ({ data = [] }) => {
  const chartData = data.map(quarter => ({
    quarter: quarter.quarter,
    revenue: quarter.revenue,
    profit: quarter.profit
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Quarterly Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="quarter" 
                dy={10}
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="revenue"
                orientation="left"
                tick={{ fill: '#666', fontSize: 12 }}
                tickFormatter={value => `₹${(value / 1000000).toFixed(0)}M`}
              />
              <YAxis 
                yAxisId="profit"
                orientation="right"
                tick={{ fill: '#666', fontSize: 12 }}
                tickFormatter={value => `₹${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `₹${(value / 1000000).toFixed(2)}M`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Legend />
              <Line 
                yAxisId="revenue"
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Revenue"
              />
              <Line 
                yAxisId="profit"
                type="monotone" 
                dataKey="profit" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};