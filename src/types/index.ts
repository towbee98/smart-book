export type CarType = 'sedan' | 'suv' | 'truck'
export type Service = 'wash' | 'detailing'

export interface Station {
  id: string
  name: string
  carTypes: CarType[]
  services: Service[]
}

export interface TimeSlot {
  id: string
  stationId: string
  startTime: string
  endTime: string
  isAvailable: boolean
} 