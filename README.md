# Stock Analysis UI

A modern React application for analyzing stock market data.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create .env file in the root directory:
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000.

## Features

- Real-time market data visualization
- Advanced sorting and filtering
- AI-powered stock analysis
- Modern, responsive UI
- High-performance data handling

## Project Structure

```
/src
  /components      # Reusable UI components
  /features        # Feature-based modules
    /market-overview
      /components  # Feature-specific components
      /hooks      # Custom hooks
      /utils      # Utility functions
  /services       # API and data services
  /lib            # Shared utilities
```

## Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## Dependencies

- React 18
- Radix UI components
- Tailwind CSS
- Recharts
- Lucide React Icons