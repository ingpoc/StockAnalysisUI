import { api } from './api';

export const marketService = {
  async getMarketData(quarter, forceRefresh = false) {
    const params = new URLSearchParams();
    if (quarter) params.append('quarter', quarter);
    if (forceRefresh) params.append('force_refresh', 'true');
    
    const response = await api.get(`/market-data?${params}`);
    return response.data;
  },

  async getQuarters() {
    const response = await api.get('/quarters');
    return response.data.quarters;
  },

  async getStockDetails(symbol) {
    const response = await api.get(`/stock/${symbol}`);
    return response.data;
  },

  async getAnalysisHistory(symbol) {
    const response = await api.get(`/stock/${symbol}/analysis-history`);
    return response.data.analyses;
  },

  async refreshAnalysis(symbol) {
    const response = await api.post(`/stock/${symbol}/refresh-analysis`);
    return response.data;
  },

  async getAnalysisContent(analysisId) {
    const response = await api.get(`/analysis/${analysisId}`);
    return response.data;
  }
};