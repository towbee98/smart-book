import { render, screen, fireEvent } from '@testing-library/react'
import { BookingProvider } from '../../context/BookingContext'
import { VehicleSelector } from '../VehicleSelector'

const mockVehicles = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    type: 'sedan',
    licensePlate: 'ABC123',
    year: 2020,
    lastServiceDate: '2024-01-01',
    serviceHistory: []
  }
]

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockVehicles)
  })
) as jest.Mock

describe('VehicleSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders vehicle options', () => {
    render(
      <BookingProvider>
        <VehicleSelector />
      </BookingProvider>
    )

    expect(screen.getByText('Select Your Vehicle')).toBeInTheDocument()
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda CR-V')).toBeInTheDocument()
    expect(screen.getByText('Ford F-150')).toBeInTheDocument()
  })

  it('displays vehicle details correctly', () => {
    render(
      <BookingProvider>
        <VehicleSelector />
      </BookingProvider>
    )

    const camryCard = screen.getByText('Toyota Camry').closest('div')
    expect(camryCard).toHaveTextContent('sedan')
    expect(camryCard).toHaveTextContent('ABC123')
  })

  it('selects a vehicle when clicked', () => {
    render(
      <BookingProvider>
        <VehicleSelector />
      </BookingProvider>
    )

    const camryCard = screen.getByText('Toyota Camry').closest('div')
    fireEvent.click(camryCard!)

    // Check if the selected vehicle has the selected styling
    expect(camryCard).toHaveClass('ring-2', 'ring-blue-500')
  })

  it('renders all available vehicle types', () => {
    render(
      <BookingProvider>
        <VehicleSelector />
      </BookingProvider>
    )

    expect(screen.getByText('SEDAN')).toBeInTheDocument()
    expect(screen.getByText('SUV')).toBeInTheDocument()
    expect(screen.getByText('TRUCK')).toBeInTheDocument()
  })

  it('dispatches SELECT_VEHICLE action when a vehicle type is clicked', () => {
    render(
      <BookingProvider>
        <VehicleSelector />
      </BookingProvider>
    )

    const sedanButton = screen.getByText('SEDAN')
    fireEvent.click(sedanButton)

    // The button should now have the selected styles
    expect(sedanButton).toHaveClass('bg-blue-600')
  })

  it('shows selected vehicle type with different styling', () => {
    render(
      <BookingProvider>
        <VehicleSelector />
      </BookingProvider>
    )

    const sedanButton = screen.getByText('SEDAN')
    const suvButton = screen.getByText('SUV')

    // Initially, no vehicle is selected
    expect(sedanButton).not.toHaveClass('bg-blue-600')
    expect(suvButton).not.toHaveClass('bg-blue-600')

    // Click sedan button
    fireEvent.click(sedanButton)

    // Sedan button should be selected
    expect(sedanButton).toHaveClass('bg-blue-600')
    expect(suvButton).not.toHaveClass('bg-blue-600')

    // Click SUV button
    fireEvent.click(suvButton)

    // SUV button should be selected, sedan button should not
    expect(sedanButton).not.toHaveClass('bg-blue-600')
    expect(suvButton).toHaveClass('bg-blue-600')
  })
}) 