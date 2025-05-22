import React, { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Station, TimeSlot, CarType, Service, Vehicle } from '../types'

// Define the state shape
interface BookingState {
  selectedVehicle: Vehicle | null
  selectedStation: string | null
  selectedService: Service | null
  stations: Station[]
  timeSlot: TimeSlot | null
  bookingStatus: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
}

// Define action types
type BookingAction =
  | { type: 'SELECT_VEHICLE'; payload: Vehicle }
  | { type: 'SELECT_STATION'; payload: string }
  | { type: 'SELECT_SERVICE'; payload: Service }
  | { type: 'SET_STATIONS'; payload: Station[] }
  | { type: 'SET_TIME_SLOT'; payload: TimeSlot | null }
  | { type: 'BOOK_SLOT_SUCCESS' }
  | { type: 'BOOK_SLOT_ERROR'; payload: string }
  | { type: 'RESET_BOOKING' }

// Initial state
const initialState: BookingState = {
  selectedVehicle: null,
  selectedStation: null,
  selectedService: null,
  stations: [],
  timeSlot: null,
  bookingStatus: 'idle',
  error: null,
}

// Create reducer
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SELECT_VEHICLE':
      return {
        ...state,
        selectedVehicle: action.payload,
        selectedStation: null,
        timeSlot: null,
      }
    case 'SELECT_STATION':
      return {
        ...state,
        selectedStation: action.payload,
        timeSlot: null,
      }
    case 'SELECT_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
      }
    case 'SET_STATIONS':
      return {
        ...state,
        stations: action.payload,
      }
    case 'SET_TIME_SLOT':
      return {
        ...state,
        timeSlot: action.payload,
      }
    case 'BOOK_SLOT_SUCCESS':
      return {
        ...state,
        bookingStatus: 'success',
        error: null,
      }
    case 'BOOK_SLOT_ERROR':
      return {
        ...state,
        bookingStatus: 'error',
        error: action.payload,
      }
    case 'RESET_BOOKING':
      return initialState
    default:
      return state
  }
}

// Create context
interface BookingContextType {
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

// Create provider component
interface BookingProviderProps {
  children: ReactNode
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

// Create custom hook for using the context
export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
} 