import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCcw, Calendar } from "lucide-react";
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AIAnalysisModal = ({ isOpen, onClose, stock }) => {
  const {
    analyses,
    selectedAnalysis,
    isLoading,
    error,
    setSelectedAnalysis,
    refreshAnalysis
  } = useAIAnalysis(stock?.symbol);

  if (!stock) return null;

  const handleRefresh = async () => {
    await refreshAnalysis();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Analysis - {stock.company_name}</span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive analysis based on fundamentals and market sentiment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* History Dropdown */}
          <div className="flex items-center space-x-4">
            <Select
              value={selectedAnalysis?.id}
              onValueChange={(value) => setSelectedAnalysis(value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select analysis version" />
              </SelectTrigger>
              <SelectContent>
                {analyses.map((analysis) => (
                  <SelectItem key={analysis.id} value={analysis.id}>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{analysis.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Analysis Content */}
          <Card>
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[95%]" />
                </div>
              ) : error ? (
                <div className="text-red-500">Error loading analysis: {error}</div>
              ) : selectedAnalysis ? (
                <div className="prose prose-sm max-w-none">
                  <div className="mb-4">
                    <span className="font-semibold">Recommendation: </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${selectedAnalysis.recommendation === 'Buy' ? 'bg-green-100 text-green-800' :
                      selectedAnalysis.recommendation === 'Sell' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                      {selectedAnalysis.recommendation}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">
                    {selectedAnalysis.content}
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Select an analysis version to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisModal;