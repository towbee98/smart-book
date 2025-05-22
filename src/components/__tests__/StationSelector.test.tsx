import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookingProvider } from '../../context/BookingContext'
import { StationSelector } from '../StationSelector'
import { ReactNode, useEffect } from 'react'
import { useBooking } from '../../context/BookingContext'
import type { CarType, Service } from '../../types'

const mockStations = [
  {
    id: '1',
    name: 'Downtown Auto Care',
    location: '123 Main St',
    services: ['wash', 'detailing'] as Service[],
    carTypes: ['sedan', 'suv'] as CarType[],
    rating: 4.5
  },
  {
    id: '2',
    name: 'Westside Service Center',
    location: '456 West Ave',
    services: ['wash', 'detailing', 'repair'] as Service[],
    carTypes: ['sedan', 'suv', 'truck'] as CarType[],
    rating: 4.2
  }
]

const mockTimeSlots = [
  {
    id: '1',
    startTime: '2024-01-01T10:00:00Z',
    endTime: '2024-01-01T11:00:00Z',
    isAvailable: true,
    price: 50
  },
  {
    id: '2',
    startTime: '2024-01-01T11:00:00Z',
    endTime: '2024-01-01T12:00:00Z',
    isAvailable: true,
    price: 50
  }
]

// Mock the fetch function
global.fetch = jest.fn((url: string) => {
  if (url.includes('/timeSlots')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTimeSlots)
    })
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockStations)
  })
}) as jest.Mock

// Wrapper component that sets up a selected vehicle
const WrapperWithVehicle = ({ children }: { children: ReactNode }) => {
  return (
    <BookingProvider>
      <TestWrapper>{children}</TestWrapper>
    </BookingProvider>
  )
}

const TestWrapper = ({ children }: { children: ReactNode }) => {
  const { dispatch } = useBooking()
  
  useEffect(() => {
    dispatch({
      type: 'SELECT_VEHICLE',
      payload: {
        id: '1',
        type: 'sedan',
        model: 'Toyota Camry',
        licensePlate: 'ABC123'
      }
    })
    dispatch({
      type: 'SET_STATIONS',
      payload: mockStations
    })
  }, [dispatch])

  return <>{children}</>
}

describe('StationSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows message when no vehicle is selected', () => {
    render(
      <BookingProvider>
        <StationSelector />
      </BookingProvider>
    )

    expect(screen.getByText('Please select a vehicle first')).toBeInTheDocument()
  })

  it('shows stations when vehicle is selected', async () => {
    render(
      <WrapperWithVehicle>
        <StationSelector />
      </WrapperWithVehicle>
    )

    // Wait for the stations to be loaded
    await waitFor(() => {
      expect(screen.getByText('Downtown Auto Care')).toBeInTheDocument()
      expect(screen.getByText('Westside Service Center')).toBeInTheDocument()
    })
  })

  it('selects a station when clicked', async () => {
    render(
      <WrapperWithVehicle>
        <StationSelector />
      </WrapperWithVehicle>
    )

    // Wait for the station to be loaded and click it
    const stationButton = await screen.findByText('Downtown Auto Care')
    fireEvent.click(stationButton)

    // Check if the selected station has the selected styling
    expect(stationButton.closest('button')).toHaveClass('border-blue-500', 'bg-blue-50')
  })

  it('displays station services correctly', async () => {
    render(
      <WrapperWithVehicle>
        <StationSelector />
      </WrapperWithVehicle>
    )

    // Wait for the station to be loaded
    const stationButton = await screen.findByText('Downtown Auto Care')
    expect(stationButton.closest('button')).toHaveTextContent('wash')
    expect(stationButton.closest('button')).toHaveTextContent('detailing')
  })
}) 