import { useEffect, useState } from 'react'
import { useBooking } from '../context/BookingContext'
import { getTimeSlotsByStationId } from '../services/slotService'
import { Button } from './Button'
import { Loader } from './Loader'
import { EmptyState } from './EmptyState'
import { Skeleton } from './Skeleton'
import type { TimeSlot } from '../types'

export function TimeSlotSelector() {
  const { state, dispatch } = useBooking()
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (state.selectedStation) {
      setLoading(true)
      setError(null)
      getTimeSlotsByStationId(state.selectedStation)
        .then(data => {
          setTimeSlots(data)
          setLoading(false)
        })
        .catch(err => {
          setError('Failed to load time slots')
          setLoading(false)
        })
    }
  }, [state.selectedStation])

  if (!state.selectedStation) {
    return (
      <EmptyState
        title="Select a Station First"
        description="Please select a station to view available time slots."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton height="h-16" />
        <Skeleton height="h-16" />
        <Skeleton height="h-16" />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        title="Error Loading Time Slots"
        description={error}
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
        action={{
          label: 'Try Again',
          onClick: () => window.location.reload()
        }}
      />
    )
  }

  if (!timeSlots || timeSlots.length === 0) {
    return (
      <EmptyState
        title="No Time Slots Available"
        description="No time slots are available for the selected station."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {timeSlots.map((slot, index) => (
          <div
            key={slot.id}
            className={`
              border rounded-lg p-4
              transition-all duration-300
              ${state.timeSlot?.id === slot.id
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-blue-500 hover:shadow-md'
              }
              animate-slide-up
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="text-center">
              <div className="font-medium">
                {new Date(slot.startTime).toLocaleTimeString()} - {new Date(slot.endTime).toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">${slot.price}</div>
              <Button
                variant={state.timeSlot?.id === slot.id ? 'primary' : 'secondary'}
                size="sm"
                className="mt-3 w-full"
                onClick={() => {
                  dispatch({ type: 'SET_TIME_SLOT', payload: slot })
                  dispatch({ type: 'BOOK_SLOT_SUCCESS' })
                }}
              >
                {state.timeSlot?.id === slot.id ? 'Selected' : 'Book Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 