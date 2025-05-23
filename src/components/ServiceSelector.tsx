import { useBooking } from '../context/BookingContext'
import type { Service } from '../types'
import { Button } from './Button'
import { EmptyState } from './EmptyState'

const services: Service[] = ['wash', 'detailing']

export function ServiceSelector() {
  const { state, dispatch } = useBooking()
  const { selectedVehicle, selectedService } = state

  console.log('ServiceSelector rendered:', { selectedVehicle, selectedService })

  if (!selectedVehicle) {
    console.log('No vehicle selected, showing empty state')
    return (
      <EmptyState
        title="Select a Vehicle First"
        description="Please select a vehicle type to view available services."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        }
      />
    )
  }

  console.log('Vehicle selected, showing services:', services)
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Available Services</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Button
            key={service}
            variant={selectedService === service ? 'secondary' : 'primary'}
            onClick={() => {
              console.log('Service selected:', service)
              dispatch({ type: 'SELECT_SERVICE', payload: service })
            }}
            className="w-full"
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  )
} 