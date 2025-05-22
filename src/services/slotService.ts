import type { TimeSlot } from '../types'

/**
 * Fetches time slots for a given stationId
 * @param stationId The ID of the station
 * @returns Promise resolving to an array of TimeSlot
 */
export async function getTimeSlotsByStationId(stationId: string): Promise<TimeSlot[]> {
  try {
    const response = await fetch(`/api/stations/${stationId}/timeSlots`)
    if (!response.ok) throw new Error('Failed to fetch time slots')
    const slots: TimeSlot[] = await response.json()
    return slots
  } catch (error) {
    console.error('Error fetching time slots:', error)
    throw new Error('Failed to fetch time slots')
  }
} 