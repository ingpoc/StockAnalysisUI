import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export const TechnicalIndicators = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <LineChart className="h-5 w-5" /> Technical Indicators
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(data?.technical_indicators || {}).map(([key, value]) => (
          <div key={key}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <p className={`text-2xl font-bold ${
              value.signal === 'buy' ? 'text-green-600' :
              value.signal === 'sell' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {value.value}
            </p>
            <p className="text-sm text-muted-foreground capitalize">{value.signal} Signal</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);