import { useEffect } from 'react'
import { useBooking } from './context/BookingContext'
import { VehicleSelector } from './components/VehicleSelector'
import { StationSelector } from './components/StationSelector'
import { TimeSlotSelector } from './components/TimeSlotSelector'

import './App.css'

function App() {
  const { state, dispatch } = useBooking()

  useEffect(() => {
    console.log('Fetching stations...')
    fetch('/api/stations')
      .then(res => {
        console.log('Response received:', res)
        return res.json()
      })
      .then(data => {
        console.log('Mock data received:', data)
        dispatch({ type: 'SET_STATIONS', payload: data })
      })
      .catch(error => {
        console.error('Error fetching stations:', error)
      })
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Smart Booking Interface
      </h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <VehicleSelector />
        <StationSelector />
        <TimeSlotSelector />
      </div>
    </div>
  )
}

export default App
