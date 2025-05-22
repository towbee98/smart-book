interface SkeletonProps {
  className?: string
  height?: string
  width?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const roundedStyles = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

export function Skeleton({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = 'md'
}: SkeletonProps) {
  return (
    <div
      className={`
        ${height}
        ${width}
        ${roundedStyles[rounded]}
        bg-gray-200
        animate-pulse
        ${className}
      `}
    />
  )
} 