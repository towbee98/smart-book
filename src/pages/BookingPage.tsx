import { useBooking } from '../context/BookingContext'
import { VehicleSelector } from '../components/VehicleSelector'
import { ServiceSelector } from '../components/ServiceSelector'
import { StationSelector } from '../components/StationSelector'
import { TimeSlotSelector } from '../components/TimeSlotSelector'
import { BookingSuccess } from '../components/BookingSuccess'
import { Button } from '../components/Button'
import { Loader } from '../components/Loader'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'

export function BookingPage() {
  const { state, dispatch } = useBooking()
  const { bookingStatus } = state

  console.log('BookingPage rendered with status:', bookingStatus)

  if (bookingStatus === 'success') {
    console.log('Rendering BookingSuccess component')
    return (
      <div className="animate-fade-in">
        <BookingSuccess />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 animate-slide-down text-gray-800">
        Book Your Service
      </h1>

      <div className="space-y-6 sm:space-y-8">
        {/* Vehicle Selection */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md animate-slide-up">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">1. Select Your Vehicle</h2>
          <VehicleSelector />
        </section>

        {/* Service Selection */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md animate-slide-up delay-100">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">2. Choose Your Service</h2>
          <ServiceSelector />
        </section>

        {/* Station Selection */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md animate-slide-up delay-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">3. Select a Station</h2>
          <StationSelector />
        </section>

        {/* Time Slot Selection */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-all duration-300 hover:shadow-md animate-slide-up delay-300">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">4. Choose a Time Slot</h2>
          <TimeSlotSelector />
        </section>
      </div>
    </div>
  )
} 