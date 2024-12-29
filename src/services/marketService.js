import { api } from './api';

export const marketService = {
  async getMarketData(quarter, forceRefresh = false) {
    const params = new URLSearchParams();
    if (quarter) params.append('quarter', quarter);
    if (forceRefresh) params.append('force_refresh', 'true');
    
    const response = await api.get(`/api/v1/market-data?${params}`);
    return response.data;
  },

  async getQuarters() {
    const response = await api.get('/api/v1/quarters');
    return Array.isArray(response.data) ? response.data : response.data.quarters || [];
  },

  async getStockDetails(symbol) {
    const response = await api.get(`/api/v1/stock/${symbol}`);
    return response.data;
  },

  async getAnalysisHistory(symbol) {
    const response = await api.get(`/api/v1/stock/${symbol}/analysis-history`);
    return response.data.analyses;
  },

  async refreshAnalysis(symbol) {
    const response = await api.post(`/api/v1/stock/${symbol}/refresh-analysis`);
    return response.data;
  },

  async getAnalysisContent(analysisId) {
    const response = await api.get(`/api/v1/analysis/${analysisId}`);
    return response.data;
  }
};