import * as React from 'react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  children: React.ReactNode
  title?: string
  icon?: React.ReactNode
  variant?: 'default' | 'info' | 'warning' | 'success' | 'danger'
  className?: string
}

const variantStyles = {
  default: {
    container: 'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-purple-500/30',
    icon: 'bg-purple-500/20 border-purple-500/40',
    title: 'text-purple-400',
  },
  info: {
    container: 'bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-blue-500/10 border-blue-500/30',
    icon: 'bg-blue-500/20 border-blue-500/40',
    title: 'text-blue-400',
  },
  warning: {
    container: 'bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border-yellow-500/30',
    icon: 'bg-yellow-500/20 border-yellow-500/40',
    title: 'text-yellow-400',
  },
  success: {
    container: 'bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-green-500/10 border-green-500/30',
    icon: 'bg-green-500/20 border-green-500/40',
    title: 'text-green-400',
  },
  danger: {
    container: 'bg-gradient-to-br from-red-500/10 via-pink-500/10 to-red-500/10 border-red-500/30',
    icon: 'bg-red-500/20 border-red-500/40',
    title: 'text-red-400',
  },
}

const defaultIcons = {
  default: '⚡',
  info: 'ℹ',
  warning: '⚠',
  success: '✓',
  danger: '✕',
}

/**
 * Callout component for highlighted information boxes
 * 
 * @example
 * ```tsx
 * <Callout title="What makes Elide special?" variant="default">
 *   Unlike traditional runtimes, Elide can compile your entire application
 *   into a single native binary.
 * </Callout>
 * 
 * <Callout title="Important" variant="warning" icon="⚠">
 *   Make sure to install dependencies first!
 * </Callout>
 * ```
 */
export function Callout({
  children,
  title,
  icon,
  variant = 'default',
  className,
}: CalloutProps) {
  const styles = variantStyles[variant]
  const displayIcon = icon || defaultIcons[variant]

  return (
    <div
      className={cn(
        'my-8 p-8 rounded-2xl border-2 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-sm',
        styles.container,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border',
            styles.icon
          )}
        >
          <span className="text-2xl">{displayIcon}</span>
        </div>
        <div className="flex-1">
          {title && (
            <h3 className={cn('text-xl font-bold mb-3 mt-0', styles.title)}>
              {title}
            </h3>
          )}
          <div className="text-base text-foreground/90 leading-relaxed m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

