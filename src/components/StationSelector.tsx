import { useBooking } from '../context/BookingContext'
import { useStations } from '../hooks/useStations'
import { Button } from './Button'
import { Loader } from './Loader'
import { EmptyState } from './EmptyState'
import { Skeleton } from './Skeleton'

export function StationSelector() {
  const { state, dispatch } = useBooking()
  const { data: stations, loading, error } = useStations()
  const { selectedVehicle, selectedService } = state

  if (!selectedVehicle) {
    return (
      <EmptyState
        title="Select a Vehicle First"
        description="Please select a vehicle type to view available stations."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        }
      />
    )
  }

  if (!selectedService) {
    return (
      <EmptyState
        title="Select a Service First"
        description="Please select a service to view available stations."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton height="h-12" />
        <Skeleton height="h-12" />
        <Skeleton height="h-12" />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        title="Error Loading Stations"
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

  if (!stations || stations.length === 0) {
    return (
      <EmptyState
        title="No Stations Available"
        description="No stations are available for the selected vehicle type and service."
        icon={
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
      />
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select a Station</h2>
      <div className="grid gap-4">
        {stations.map((station, index) => (
          <div
            key={station.id}
            className={`
              border rounded-lg p-4
              transition-all duration-300
              ${state.selectedStation === station.id
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-blue-500 hover:shadow-md'
              }
              animate-slide-up
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-base text-black">{station.name}</h3>
                <p className="text-sm text-gray-600">{station.location}</p>
              </div>
              <Button
                variant={state.selectedStation === station.id ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => dispatch({ type: 'SELECT_STATION', payload: station.id })}
              >
                {state.selectedStation === station.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 