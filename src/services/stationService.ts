import type { Station, CarType, Service } from '../types'
import { API_ENDPOINTS } from '../config/env'

/**
 * Filters stations based on car type and service
 * @param stations Array of stations to filter
 * @param carType The type of car to filter by
 * @param service The service to filter by
 * @returns Filtered array of stations that support both the car type and service
 */
export function filterStations(
  stations: Station[],
  carType: CarType,
  service: Service
): Station[] {
  return stations.filter(station => 
    station.carTypes.includes(carType) && 
    station.services.includes(service)
  )
}

/**
 * Fetches and filters stations based on car type and service
 * @param carType The type of car to filter by
 * @param service The service to filter by
 * @returns Promise resolving to filtered array of stations
 */
export async function getFilteredStations(
  carType: CarType,
  service: Service
): Promise<Station[]> {
  try {
    const response = await fetch(API_ENDPOINTS.stations)
    
    const stations: Station[] = await response.json()
    console.log('Stations:', stations)
    return filterStations(stations, carType, service)
  } catch (error) {
    console.error('Error fetching stations:', error)
    throw new Error('Failed to fetch stations')
  }
} 