import { render, screen, fireEvent } from '@testing-library/react'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  const defaultProps = {
    title: 'No items found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.'
  }

  it('renders title and description', () => {
    render(<EmptyState {...defaultProps} />)
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    const icon = <svg data-testid="test-icon" />
    render(<EmptyState {...defaultProps} icon={icon} />)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const action = {
      label: 'Create New',
      onClick: jest.fn()
    }
    render(<EmptyState {...defaultProps} action={action} />)
    const button = screen.getByRole('button', { name: action.label })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(action.onClick).toHaveBeenCalledTimes(1)
  })

  it('does not render icon or action button when not provided', () => {
    render(<EmptyState {...defaultProps} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<EmptyState {...defaultProps} />)
    const container = screen.getByText(defaultProps.title).parentElement
    expect(container).toHaveClass('text-center py-12')
  })
}) 