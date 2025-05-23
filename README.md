# Smart Booking System

A modern, user-friendly booking system for vehicle services built with React and TypeScript.

## Features

- **Multi-step Booking Process**
  - Vehicle Type Selection
  - Service Selection
  - Station Selection
  - Time Slot Booking
- **Responsive Design**
  - Mobile-first approach
  - Clean and intuitive interface
  - Smooth animations and transitions
- **Real-time Availability**
  - Dynamic time slot management
  - Station capacity tracking
  - Service-specific scheduling

## Design Choices

### UI Components

1. **Button Component**
   - Variants: primary (white/black), secondary (black/white), success, danger
   - Consistent styling with hover states
   - Support for loading states and disabled conditions
   - Responsive sizing (sm, md, lg)

2. **EmptyState Component**
   - Clear messaging for empty states
   - Customizable icons and actions
   - Consistent styling across the application

3. **Loading States**
   - Skeleton loaders for content
   - Spinner for button loading states
   - Smooth transitions between states

### Color Scheme

- **Primary Colors**
  - Black and White for buttons (selected/unselected states)
  - Blue accents for interactive elements
  - Gray scales for text hierarchy

- **Text Colors**
  - Black for primary headings and important information
  - Gray-600 for secondary text
  - Blue for interactive elements and prices

### State Management

- **Context-based State Management**
  - Centralized booking state
  - Clear action types and reducers
  - Predictable state updates

### Component Architecture

1. **BookingPage**
   - Main container component
   - Manages the booking flow
   - Handles success/error states

2. **Selector Components**
   - VehicleSelector
   - ServiceSelector
   - StationSelector
   - TimeSlotSelector
   - Each with consistent styling and behavior

3. **Success Component**
   - Clear confirmation message
   - Detailed booking summary
   - Option to start new booking

## Technical Decisions

1. **TypeScript**
   - Strong typing for better development experience
   - Interface definitions for all data structures
   - Type safety for API responses

2. **Tailwind CSS**
   - Utility-first approach
   - Consistent spacing and sizing
   - Responsive design utilities

3. **Component Structure**
   - Reusable components
   - Clear separation of concerns
   - Consistent prop interfaces

4. **Error Handling**
   - Graceful error states
   - User-friendly error messages
   - Retry mechanisms

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
smart-booking/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Loader.tsx
│   │   ├── Skeleton.tsx
│   │   ├── VehicleSelector.tsx
│   │   ├── ServiceSelector.tsx
│   │   ├── StationSelector.tsx
│   │   ├── TimeSlotSelector.tsx
│   │   └── BookingSuccess.tsx
│   ├── context/
│   │   └── BookingContext.tsx
│   ├── hooks/
│   │   └── useStations.ts
│   ├── services/
│   │   ├── stationService.ts
│   │   └── slotService.ts
│   ├── types/
│   │   └── index.ts
│   └── pages/
│       └── BookingPage.tsx
```

## Future Improvements

1. **Enhanced Error Handling**
   - More detailed error messages
   - Better error recovery options

2. **Performance Optimizations**
   - Code splitting
   - Lazy loading of components
   - Memoization of expensive computations

3. **Additional Features**
   - User authentication
   - Booking history
   - Service reviews and ratings
   - Payment integration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 