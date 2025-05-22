import { filterStations, getFilteredStations } from '../stationService'
import type { Station, CarType, Service } from '../../types'

const mockStations: Station[] = [
  {
    id: '1',
    name: 'Downtown Auto Care',
    location: '123 Main St',
    services: ['wash', 'detailing'] as Service[],
    carTypes: ['sedan', 'suv'] as CarType[],
    rating: 4.5
  },
  {
    id: '2',
    name: 'Westside Service Center',
    location: '456 West Ave',
    services: ['wash', 'detailing', 'repair'] as Service[],
    carTypes: ['sedan', 'suv', 'truck'] as CarType[],
    rating: 4.2
  },
  {
    id: '3',
    name: 'Eastside Auto Shop',
    location: '789 East Blvd',
    services: ['repair', 'maintenance'] as Service[],
    carTypes: ['truck', 'van'] as CarType[],
    rating: 4.0
  }
]

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockStations)
  })
) as jest.Mock

describe('stationService', () => {
  describe('filterStations', () => {
    it('filters stations by car type and service', () => {
      const filtered = filterStations(mockStations, 'sedan', 'wash')
      expect(filtered).toHaveLength(2)
      expect(filtered[0].name).toBe('Downtown Auto Care')
      expect(filtered[1].name).toBe('Westside Service Center')
    })

    it('returns empty array when no stations match criteria', () => {
      const filtered = filterStations(mockStations, 'van', 'wash')
      expect(filtered).toHaveLength(0)
    })

    it('handles case where all stations match criteria', () => {
      const filtered = filterStations(mockStations, 'sedan', 'detailing')
      expect(filtered).toHaveLength(2)
    })
  })

  describe('getFilteredStations', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('fetches and filters stations successfully', async () => {
      const filtered = await getFilteredStations('sedan', 'wash')
      expect(filtered).toHaveLength(2)
      expect(fetch).toHaveBeenCalledWith('/api/stations')
    })

    it('throws error when fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))
      await expect(getFilteredStations('sedan', 'wash')).rejects.toThrow('Failed to fetch stations')
    })
  })
}) 