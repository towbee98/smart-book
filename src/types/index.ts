export type CarType = 'sedan' | 'suv' | 'truck'
export type Service = 'wash' | 'detailing'

export interface Vehicle {
  id: string
  type: CarType
  model: string
  licensePlate: string
}

export interface Station {
  id: string
  name: string
  carTypes: CarType[]
  services: Service[]
  location: string
  rating: number
}

export interface TimeSlot {
  id: string
  stationId: string
  startTime: string
  endTime: string
  isAvailable: boolean
  price: number
} 