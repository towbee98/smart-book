import { useBooking } from '../context/BookingContext'
import type { Service } from '../types'

const services: Service[] = ['wash', 'detailing']

export function ServiceSelector() {
  const { state, dispatch } = useBooking()
  const selectedService = state.selectedService

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Service
      </label>
      <div className="grid grid-cols-2 gap-2">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => dispatch({ type: 'SELECT_SERVICE', payload: service })}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${
                selectedService === service
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
} 