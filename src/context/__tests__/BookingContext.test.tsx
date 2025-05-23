import { render, screen, fireEvent } from '@testing-library/react'
import { BookingProvider, useBooking } from '../BookingContext'
import type { Vehicle, Station, TimeSlot } from '../../types'

// Test component that uses the booking context
function TestComponent() {
  const { state, dispatch } = useBooking()
  const mockVehicle: Vehicle = {
    id: '1',
    type: 'sedan',
    model: 'Test Car',
    licensePlate: 'TEST123',
  }
  const mockStation: Station = {
    id: '1',
    name: 'Test Station',
    carTypes: ['sedan'],
    services: ['wash'],
    location: 'Test Location',
    rating: 4.5,
  }
  const mockTimeSlot: TimeSlot = {
    id: '1',
    stationId: '1',
    startTime: '2024-03-20T10:00:00',
    endTime: '2024-03-20T11:00:00',
    isAvailable: true,
    price: 50,
  }

  return (
    <div>
      <div data-testid="vehicle">{state.selectedVehicle?.model || 'No vehicle'}</div>
      <div data-testid="station">{state.selectedStation || 'No station'}</div>
      <div data-testid="timeSlot">{state.timeSlot?.id || 'No time slot'}</div>
      <div data-testid="bookingStatus">{state.bookingStatus}</div>
      
      <button onClick={() => dispatch({ type: 'SELECT_VEHICLE', payload: mockVehicle })}>
        Select Vehicle
      </button>
      <button onClick={() => dispatch({ type: 'SELECT_STATION', payload: mockStation.id })}>
        Select Station
      </button>
      <button onClick={() => dispatch({ type: 'SET_TIME_SLOT', payload: mockTimeSlot })}>
        Select Time Slot
      </button>
      <button onClick={() => dispatch({ type: 'BOOK_SLOT_SUCCESS' })}>
        Book Success
      </button>
      <button onClick={() => dispatch({ type: 'RESET_BOOKING' })}>
        Reset
      </button>
    </div>
  )
}

describe('BookingContext', () => {
  it('initializes with default state', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    )

    expect(screen.getByTestId('vehicle')).toHaveTextContent('No vehicle')
    expect(screen.getByTestId('station')).toHaveTextContent('No station')
    expect(screen.getByTestId('timeSlot')).toHaveTextContent('No time slot')
    expect(screen.getByTestId('bookingStatus')).toHaveTextContent('idle')
  })

  it('updates state when selecting a vehicle', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    )

    fireEvent.click(screen.getByText('Select Vehicle'))
    expect(screen.getByTestId('vehicle')).toHaveTextContent('Test Car')
  })

  it('updates state when selecting a station', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    )

    fireEvent.click(screen.getByText('Select Station'))
    expect(screen.getByTestId('station')).toHaveTextContent('1')
  })

  it('updates state when selecting a time slot', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    )

    fireEvent.click(screen.getByText('Select Time Slot'))
    expect(screen.getByTestId('timeSlot')).toHaveTextContent('1')
  })

  it('updates state when booking is successful', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    )

    fireEvent.click(screen.getByText('Book Success'))
    expect(screen.getByTestId('bookingStatus')).toHaveTextContent('success')
  })

  it('resets state when reset action is dispatched', () => {
    render(
      <BookingProvider>
        <TestComponent />
      </BookingProvider>
    )

    // First set some state
    fireEvent.click(screen.getByText('Select Vehicle'))
    fireEvent.click(screen.getByText('Select Station'))
    fireEvent.click(screen.getByText('Select Time Slot'))

    // Then reset
    fireEvent.click(screen.getByText('Reset'))

    // Check if state is reset
    expect(screen.getByTestId('vehicle')).toHaveTextContent('No vehicle')
    expect(screen.getByTestId('station')).toHaveTextContent('No station')
    expect(screen.getByTestId('timeSlot')).toHaveTextContent('No time slot')
    expect(screen.getByTestId('bookingStatus')).toHaveTextContent('idle')
  })
}) 