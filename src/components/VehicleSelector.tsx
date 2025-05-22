import { useBooking } from '../context/BookingContext'
import type { CarType } from '../types'

const carTypes: CarType[] = ['sedan', 'suv', 'truck']

export function VehicleSelector() {
  const { state, dispatch } = useBooking()
  const selectedVehicle = state.selectedVehicle

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Your Vehicle Type
      </label>
      <div className="grid grid-cols-3 gap-2">
        {carTypes.map((type) => (
          <button
            key={type}
            onClick={() => dispatch({ 
              type: 'SELECT_VEHICLE', 
              payload: { 
                id: 'temp', // This will be replaced with actual vehicle data
                type,
                model: 'Default Model',
                licensePlate: 'TEMP123'
              }
            })}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${
                selectedVehicle?.type === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
} 