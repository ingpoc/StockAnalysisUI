import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MarketOverview from './features/market-overview/MarketOverview';
import StockDetails from './features/stock-details/StockDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/market-overview" replace />} />
          <Route path="/market-overview" element={<MarketOverview />} />
          <Route path="/stocks/:symbol" element={<StockDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;