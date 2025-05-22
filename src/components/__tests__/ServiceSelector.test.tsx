import { render, screen, fireEvent } from '@testing-library/react'
import { ServiceSelector } from '../ServiceSelector'
import { BookingProvider } from '../../context/BookingContext'

describe('ServiceSelector', () => {
  it('renders all available services', () => {
    render(
      <BookingProvider>
        <ServiceSelector />
      </BookingProvider>
    )

    expect(screen.getByText('Wash')).toBeInTheDocument()
    expect(screen.getByText('Detailing')).toBeInTheDocument()
  })

  it('dispatches SELECT_SERVICE action when a service is clicked', () => {
    render(
      <BookingProvider>
        <ServiceSelector />
      </BookingProvider>
    )

    const washButton = screen.getByText('Wash')
    fireEvent.click(washButton)

    // The button should now have the selected styles
    expect(washButton).toHaveClass('bg-blue-600')
  })

  it('shows selected service with different styling', () => {
    render(
      <BookingProvider>
        <ServiceSelector />
      </BookingProvider>
    )

    const washButton = screen.getByText('Wash')
    const detailingButton = screen.getByText('Detailing')

    // Initially, no service is selected
    expect(washButton).not.toHaveClass('bg-blue-600')
    expect(detailingButton).not.toHaveClass('bg-blue-600')

    // Click wash button
    fireEvent.click(washButton)

    // Wash button should be selected
    expect(washButton).toHaveClass('bg-blue-600')
    expect(detailingButton).not.toHaveClass('bg-blue-600')

    // Click detailing button
    fireEvent.click(detailingButton)

    // Detailing button should be selected, wash button should not
    expect(washButton).not.toHaveClass('bg-blue-600')
    expect(detailingButton).toHaveClass('bg-blue-600')
  })
}) 