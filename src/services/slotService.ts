import type { TimeSlot } from '../types'

/**
 * Fetches time slots for a given stationId
 * @param stationId The ID of the station
 * @returns Promise resolving to an array of TimeSlot
 */
export async function getTimeSlotsByStationId(stationId: string): Promise<TimeSlot[]> {
  try {
    // First get all time slots
    const response = await fetch('/api/timeSlots')
    if (!response.ok) throw new Error('Failed to fetch time slots')
    const data = await response.json()
    // Get the time slots for the specific station
    const slots: TimeSlot[] = data[stationId] || []
    console.log('Fetched time slots:', slots)
    return slots
  } catch (error) {
    console.error('Error fetching time slots:', error)
    throw new Error('Failed to fetch time slots')
  }
} 