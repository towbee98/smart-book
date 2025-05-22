import { setupWorker } from 'msw/browser'
import { http, HttpResponse } from 'msw'
import stationsData from './stations.json'
import timeSlotsData from './timeSlots.json'
import type { TimeSlot } from '../types'

type TimeSlotsByStation = {
  [key: string]: TimeSlot[]
}

export const handlers = [
  http.get('/api/stations', () => {
    return HttpResponse.json(stationsData.stations)
  }),
  http.get('/api/stations/:stationId/timeSlots', ({ params }) => {
    const stationId = params.stationId as string
    const timeSlots = (timeSlotsData.timeSlots as TimeSlotsByStation)[stationId] || []
    return HttpResponse.json(timeSlots)
  })
]

export const worker = setupWorker(...handlers)