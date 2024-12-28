import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const FinancialMetrics = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5" /> Financial Metrics
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(data?.metrics || {}).map(([key, value]) => (
          <div key={key}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);