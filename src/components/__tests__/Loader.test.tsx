import { render, screen } from '@testing-library/react'
import { Loader } from '../Loader'

describe('Loader', () => {
  it('renders with default size', () => {
    render(<Loader />)
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('h-6 w-6')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Loader size="sm" />)
    expect(screen.getByRole('status')).toHaveClass('h-4 w-4')

    rerender(<Loader size="lg" />)
    expect(screen.getByRole('status')).toHaveClass('h-8 w-8')
  })

  it('applies custom className', () => {
    render(<Loader className="text-blue-500" />)
    expect(screen.getByRole('status')).toHaveClass('text-blue-500')
  })

  it('has correct animation classes', () => {
    render(<Loader />)
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('animate-spin')
  })
}) 