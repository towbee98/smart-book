import { render, screen } from '@testing-library/react'
import { Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('presentation')
    expect(skeleton).toHaveClass('h-4 w-full rounded-md')
  })

  it('renders with custom height and width', () => {
    render(<Skeleton height="h-8" width="w-32" />)
    const skeleton = screen.getByRole('presentation')
    expect(skeleton).toHaveClass('h-8 w-32')
  })

  it('renders with different rounded corners', () => {
    const { rerender } = render(<Skeleton rounded="none" />)
    expect(screen.getByRole('presentation')).not.toHaveClass('rounded')

    rerender(<Skeleton rounded="sm" />)
    expect(screen.getByRole('presentation')).toHaveClass('rounded-sm')

    rerender(<Skeleton rounded="lg" />)
    expect(screen.getByRole('presentation')).toHaveClass('rounded-lg')

    rerender(<Skeleton rounded="full" />)
    expect(screen.getByRole('presentation')).toHaveClass('rounded-full')
  })

  it('applies custom className', () => {
    render(<Skeleton className="bg-gray-300" />)
    expect(screen.getByRole('presentation')).toHaveClass('bg-gray-300')
  })

  it('has animation class', () => {
    render(<Skeleton />)
    expect(screen.getByRole('presentation')).toHaveClass('animate-pulse')
  })
}) 