import { useBooking } from '../context/BookingContext'
import { Button } from './Button'
import { EmptyState } from './EmptyState'

export function BookingSuccess() {
  const { state, dispatch } = useBooking()
  const { selectedVehicle, selectedService, selectedStation, timeSlot } = state
  const today = new Date()
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <EmptyState
        title="Booking Successful!"
        description="Your service has been booked successfully. We look forward to seeing you!"
        icon={
          <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      />

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle:</span>
            <span className="font-medium text-gray-800">{selectedVehicle?.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium text-gray-800">{selectedService}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Station:</span>
            <span className="font-medium text-gray-800">{selectedStation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Slot:</span>
            <span className="font-medium text-gray-800">
              {timeSlot && (
                <>
                  {new Date(`${today.toISOString().split("T")[0]}T${timeSlot.startTime}`).toLocaleTimeString()} - {new Date(`${today.toISOString().split("T")[0]}T${timeSlot.endTime}`).toLocaleTimeString()}
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="primary"
          onClick={() => dispatch({ type: 'RESET_BOOKING' })}
        >
          Start New Booking
        </Button>
      </div>
    </div>
  )
} 