import { getTimeSlotsByStationId } from '../slotService'
import type { TimeSlot } from '../../types'

describe('slotService', () => {
  const mockSlots: TimeSlot[] = [
    { id: 'a', stationId: '1', startTime: '09:00', endTime: '10:00', isAvailable: true, price: 50 },
    { id: 'b', stationId: '1', startTime: '10:00', endTime: '11:00', isAvailable: false, price: 50 }
  ]

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSlots)
      })
    ) as jest.Mock
  })

  it('fetches and returns time slots for a given stationId', async () => {
    const slots = await getTimeSlotsByStationId('1')
    expect(slots).toEqual(mockSlots)
    expect(fetch).toHaveBeenCalledWith('/api/stations/1/timeSlots')
  })

  it('throws error when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))
    await expect(getTimeSlotsByStationId('1')).rejects.toThrow('Failed to fetch time slots')
  })
}) 