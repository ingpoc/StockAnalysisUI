# Stock Analysis UI

A modern React-based dashboard for stock market analysis and visualization.

## Tech Stack
- React with TypeScript
- shadcn/ui components
- React Query for data fetching
- Tailwind CSS for styling
- Craco for configuration overrides

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-based modules
├── hooks/         # Custom React hooks
├── services/      # API and external services
├── styles/        # Global styles and themes
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Development Guidelines
- Follow Airbnb JavaScript Style Guide
- Use TypeScript for all new code
- Maximum line length: 100 characters
- Use absolute imports with `@/` prefix
- Implement proper error boundaries
- Write unit tests for components

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run test suite
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Contributing
1. Create feature branch (`feature/your-feature-name`)
2. Commit changes using Conventional Commits
3. Write/update tests as needed
4. Submit pull request for review

## Testing
- Jest and React Testing Library
- Run `npm test` to execute test suite
- Maintain minimum 80% test coverage
