// API Service
const BASE_URL = '/api/v1';

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
};

export const marketService = {
  getMarketData: (quarter?: string) => 
    api.get(`/market-data${quarter ? `?quarter=${quarter}` : ''}`),
    
  getQuarters: () => 
    api.get('/quarters'),
    
  getStockDetails: (symbol: string) => 
    api.get(`/stock/${symbol}`),
}