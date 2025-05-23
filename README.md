# Smart Booking System

A modern web application for booking car service appointments. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🚗 Vehicle type selection
- 🔧 Service type selection
- 📍 Station selection with filtering
- ⏰ Time slot booking
- 📱 Responsive design
- 🎨 Modern UI with animations

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **State Management**: React Context
- **API Mocking**: json-server
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-booking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:

In one terminal:
```bash
npm run dev
```

In another terminal:
```bash
npm run mock-api
```

The application will be available at:
- Frontend: http://localhost:5173
- API: http://localhost:3000

## Development

### Project Structure

```
smart-booking/
├── src/
│   ├── components/     # React components
│   ├── context/       # React Context providers
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   ├── hooks/         # Custom React hooks
│   └── mock/          # Mock data and API setup
├── public/            # Static assets
├── functions/         # Netlify serverless functions
└── db.json           # Mock database
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run coverage` - Run tests with coverage
- `npm run mock-api` - Start json-server
- `npm run lint` - Run ESLint

## API Endpoints

The application uses json-server for API mocking. Available endpoints:

- `GET /api/stations` - Get all stations
- `GET /api/timeSlots` - Get all time slots
- `GET /api/timeSlots/:stationId` - Get time slots for a specific station

## Deployment

The application is configured for deployment on Netlify. The deployment process:

1. Build the frontend:
```bash
npm run build
```

2. Deploy to Netlify:
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

The deployment will:
- Build the React application
- Deploy the frontend to Netlify's CDN
- Set up serverless functions for the API
- Configure redirects for client-side routing

## Design Choices

### UI Components
- Black and white button color scheme for selected/unselected states
- Clear text hierarchy with different sizes and weights
- Responsive grid layouts for different screen sizes
- Loading states and error handling with appropriate UI feedback

### State Management
- React Context for global state management
- Separate contexts for different features
- Type-safe actions and state updates

### API Structure
- RESTful API design
- Consistent response formats
- Error handling with appropriate status codes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 