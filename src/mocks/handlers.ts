import { http, HttpResponse } from 'msw'
import type { Station, TimeSlot } from '../types'

const stations: Station[] = [
  {
    id: '1',
    name: 'Downtown Auto Care',
    carTypes: ['sedan', 'suv'],
    services: ['wash', 'detailing'],
    location: '123 Main St',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Westside Service Center',
    carTypes: ['sedan', 'suv', 'truck'],
    services: ['wash', 'detailing', 'maintenance'],
    location: '456 West Ave',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'East End Garage',
    carTypes: ['sedan', 'van'],
    services: ['wash', 'maintenance', 'repair'],
    location: '789 East Blvd',
    rating: 4.8,
  },
]

export const handlers = [
  http.get('/api/stations', () => {
    return HttpResponse.json(stations)
  }),

  http.get('/api/stations/:id/time-slots', ({ params }) => {
    const stationId = params.id as string
    const station = stations.find(s => s.id === stationId)
    
    if (!station) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Station not found',
      })
    }

    // Generate mock time slots for the next 7 days
    const timeSlots: TimeSlot[] = Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date()
      date.setDate(date.getDate() + dayIndex)
      
      return Array.from({ length: 8 }, (_, slotIndex) => ({
        id: `${stationId}-${dayIndex}-${slotIndex}`,
        stationId,
        startTime: `${date.toISOString().split('T')[0]}T${9 + slotIndex}:00:00`,
        endTime: `${date.toISOString().split('T')[0]}T${10 + slotIndex}:00:00`,
        isAvailable: Math.random() > 0.3, // 70% chance of being available
        price: 50 + Math.floor(Math.random() * 50), // Random price between 50 and 100
      }))
    }).flat()

    return HttpResponse.json(timeSlots)
  }),

  http.post('/api/bookings', async ({ request }) => {
    const { stationId, timeSlotId } = await request.json() as { stationId: string; timeSlotId: string }
    
    // Simulate random success/failure
    const success = Math.random() > 0.2 // 80% success rate
    
    if (success) {
      return HttpResponse.json({
        message: 'Booking successful',
        bookingId: `${stationId}-${timeSlotId}-${Date.now()}`,
        stationId,
        timeSlotId,
      })
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Booking failed - slot no longer available',
      })
    }
  }),
] 