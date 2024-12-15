import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-32" />
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4 mb-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-12 w-24" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};