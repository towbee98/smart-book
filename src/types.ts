export type CarType = 'sedan' | 'suv' | 'truck' | 'van'
export type Service = 'wash' | 'detailing' | 'maintenance' | 'repair'

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
  startTime: string
  endTime: string
  isAvailable: boolean
  price: number
} 