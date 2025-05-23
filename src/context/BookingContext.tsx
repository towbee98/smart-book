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
  console.log('BookingReducer action:', action)
  console.log('Previous state:', state)

  let newState: BookingState

  switch (action.type) {
    case 'SELECT_VEHICLE':
      console.log('Selecting vehicle:', action.payload)
      newState = {
        ...state,
        selectedVehicle: action.payload,
        selectedStation: null,
        timeSlot: null,
      }
      break
    case 'SELECT_STATION':
      console.log('Selecting station:', action.payload)
      newState = {
        ...state,
        selectedStation: action.payload,
        timeSlot: null,
      }
      break
    case 'SELECT_SERVICE':
      console.log('Selecting service:', action.payload)
      newState = {
        ...state,
        selectedService: action.payload,
      }
      break
    case 'SET_STATIONS':
      newState = {
        ...state,
        stations: action.payload,
      }
      break
    case 'SET_TIME_SLOT':
      console.log('Selecting time slot:', action.payload)
      newState = {
        ...state,
        timeSlot: action.payload,
      }
      break
    case 'BOOK_SLOT_SUCCESS':
      console.log('Booking success - updating state')
      newState = {
        ...state,
        bookingStatus: 'success',
        error: null,
      }
      break
    case 'BOOK_SLOT_ERROR':
      newState = {
        ...state,
        bookingStatus: 'error',
        error: action.payload,
      }
      break
    case 'RESET_BOOKING':
      console.log('Resetting booking')
      newState = initialState
      break
    default:
      newState = state
  }

  console.log('New state:', newState)
  return newState
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

  console.log('BookingProvider state:', state)

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