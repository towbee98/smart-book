import { useEffect } from 'react'
import { useBooking } from './context/BookingContext'
import { BookingPage } from './pages/BookingPage'
import { API_ENDPOINTS } from './config/env'
import './App.css'

function App() {
  const { dispatch } = useBooking()

  useEffect(() => {
    console.log('Fetching stations...')
    fetch(API_ENDPOINTS.stations)
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
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Smart Booking Interface
      </h1>
      
      <BookingPage />
    </div>
  )
}

export default App
 