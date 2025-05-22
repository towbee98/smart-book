import { useEffect, useState } from 'react'
import { useBooking } from '../context/BookingContext'
import { getFilteredStations } from '../services/stationService'
import type { Station } from '../types'

export function useStations() {
  const { state } = useBooking()
  const carType = state.selectedVehicle?.type
  const service = state.selectedService
  const [data, setData] = useState<Station[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!carType || !service) {
      setData(null)
      return
    }
    setLoading(true)
    setError(null)
    getFilteredStations(carType, service)
      .then(stations => {
        setData(stations)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Error fetching stations')
        setLoading(false)
      })
  }, [carType, service])

  return { data, loading, error }
} 