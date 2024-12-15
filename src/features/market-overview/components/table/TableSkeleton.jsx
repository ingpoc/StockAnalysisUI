import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, idx) => (
      <div key={idx} className="flex space-x-4">
        <Skeleton className="h-12 w-[200px]" />
        <Skeleton className="h-12 w-[100px]" />
        <Skeleton className="h-12 w-[150px]" />
        <Skeleton className="h-12 w-[100px]" />
        <Skeleton className="h-12 w-[100px]" />
      </div>
    ))}
  </div>
);

export default TableSkeleton;