import { useBooking } from '../context/BookingContext'
import type { CarType } from '../types'
import { Button } from './Button'

const carTypes: CarType[] = ['sedan', 'suv', 'truck']

export function VehicleSelector() {
  const { state, dispatch } = useBooking()
  const { selectedVehicle } = state

  console.log('VehicleSelector rendered:', { selectedVehicle })

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select Your Vehicle Type</h2>
      <div className="grid grid-cols-3 gap-4">
        {carTypes.map((type) => (
          <Button
            key={type}
            variant={selectedVehicle?.type === type ? 'secondary' : 'primary'}
            onClick={() => {
              console.log('Vehicle type selected:', type)
              dispatch({
                type: 'SELECT_VEHICLE',
                payload: {
                  id: `temp-${type}`,
                  type,
                  model: `${type.charAt(0).toUpperCase() + type.slice(1)} Model`,
                  licensePlate: 'TEMP-123'
                }
              })
            }}
            className="w-full"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  )
} 