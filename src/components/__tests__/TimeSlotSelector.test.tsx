import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BookingProvider } from '../../context/BookingContext'
import { TimeSlotSelector } from '../TimeSlotSelector'
import { ReactNode, useEffect } from 'react'
import { useBooking } from '../../context/BookingContext'
import { getTimeSlotsByStationId } from '../../services/slotService'

const mockTimeSlots = [
  {
    id: '1',
    stationId: '1',
    startTime: '09:00',
    endTime: '10:00',
    isAvailable: true
  },
  {
    id: '2',
    stationId: '1',
    startTime: '10:00',
    endTime: '11:00',
    isAvailable: true
  },
  {
    id: '3',
    stationId: '1',
    startTime: '11:00',
    endTime: '12:00',
    isAvailable: false
  }
]

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTimeSlots)
  })
) as jest.Mock

// Mock the slotService
jest.mock('../../services/slotService', () => ({
  getTimeSlotsByStationId: jest.fn()
}))

// Wrapper component that sets up a selected station
const WrapperWithStation = ({ children }: { children: ReactNode }) => {
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
      type: 'SELECT_STATION',
      payload: '1'
    })
  }, [dispatch])

  return <>{children}</>
}

describe('TimeSlotSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows message when no station is selected', () => {
    render(
      <BookingProvider>
        <TimeSlotSelector />
      </BookingProvider>
    )

    expect(screen.getByText('Please select a station to view available time slots.')).toBeInTheDocument()
  })

  it('shows loading state while fetching time slots', async () => {
    ;(getTimeSlotsByStationId as jest.Mock).mockImplementation(() => new Promise(() => {}))

    render(
      <BookingProvider>
        <TimeSlotSelector />
      </BookingProvider>
    )

    // Set selected station in context
    const { state, dispatch } = useBooking()
    dispatch({ type: 'SELECT_STATION', payload: '1' })

    expect(screen.getByText('Loading time slots...')).toBeInTheDocument()
  })

  it('shows error state when fetch fails', async () => {
    ;(getTimeSlotsByStationId as jest.Mock).mockRejectedValue(new Error('Failed to fetch'))

    render(
      <BookingProvider>
        <TimeSlotSelector />
      </BookingProvider>
    )

    // Set selected station in context
    const { state, dispatch } = useBooking()
    dispatch({ type: 'SELECT_STATION', payload: '1' })

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
    })
  })

  it('shows available time slots when fetch succeeds', async () => {
    ;(getTimeSlotsByStationId as jest.Mock).mockResolvedValue(mockTimeSlots)

    render(
      <BookingProvider>
        <TimeSlotSelector />
      </BookingProvider>
    )

    // Set selected station in context
    const { state, dispatch } = useBooking()
    dispatch({ type: 'SELECT_STATION', payload: '1' })

    await waitFor(() => {
      expect(screen.getByText('09:00')).toBeInTheDocument()
      expect(screen.getByText('10:00')).toBeInTheDocument()
      // Should not show unavailable slot
      expect(screen.queryByText('11:00')).not.toBeInTheDocument()
    })
  })

  it('dispatches SET_TIME_SLOT action when a time slot is clicked', async () => {
    ;(getTimeSlotsByStationId as jest.Mock).mockResolvedValue(mockTimeSlots)

    render(
      <BookingProvider>
        <TimeSlotSelector />
      </BookingProvider>
    )

    // Set selected station in context
    const { state, dispatch } = useBooking()
    dispatch({ type: 'SELECT_STATION', payload: '1' })

    await waitFor(() => {
      const firstSlot = screen.getByText('09:00').closest('button')
      fireEvent.click(firstSlot!)
      expect(firstSlot).toHaveClass('bg-blue-600')
    })
  })
}) 