import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  title,
  description,
  icon,
  action
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 text-base text-gray-600">{description}</p>
      {action && (
        <div className="mt-6">
          <Button
            variant="primary"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
} 