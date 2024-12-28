import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const CompanyOverview = ({ data }) => {
  const metrics = data?.formatted_metrics || {};
  const stockData = data?.stock || {};
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" /> Company Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Market Price</h3>
            <p className="text-2xl font-bold">₹{stockData?.financial_metrics?.[0]?.cmp?.split(' ')[0] || '--'}</p>
            <p className="text-sm text-muted-foreground">
              As of {new Date(stockData?.timestamp).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
            <p className="text-2xl font-bold">{stockData.company_name || '--'}</p>
            <p className="text-sm text-muted-foreground">{stockData.symbol}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Update</h3>
            <p className="text-xl font-bold">{stockData?.financial_metrics?.[0]?.result_date || '--'}</p>
            <p className="text-sm text-muted-foreground">{stockData?.financial_metrics?.[0]?.report_type || '--'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};