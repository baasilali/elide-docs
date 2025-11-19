import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'alert relative w-full rounded-xl px-5 py-4 text-sm [&>strong]:block [&>strong]:mb-2 [&>strong]:font-bold [&>strong]:text-primary-600 dark:[&>strong]:text-primary-400',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-primary-50/80 to-pink-50/60 border border-primary-200/50 shadow-sm shadow-primary-100/50 dark:from-primary-950/30 dark:to-pink-950/20 dark:border-primary-800/30 dark:shadow-primary-900/20',
        info: 'bg-gradient-to-br from-blue-50/80 to-sky-50/60 border border-blue-200/50 shadow-sm shadow-blue-100/50 dark:from-blue-950/30 dark:to-sky-950/20 dark:border-blue-800/30 dark:shadow-blue-900/20',
        warning: 'bg-gradient-to-br from-yellow-50/80 to-orange-50/60 border border-yellow-200/50 shadow-sm shadow-yellow-100/50 dark:from-yellow-950/30 dark:to-orange-950/20 dark:border-yellow-800/30 dark:shadow-yellow-900/20',
        destructive: 'bg-gradient-to-br from-red-50/80 to-pink-50/60 border border-red-200/50 shadow-sm shadow-red-100/50 dark:from-red-950/30 dark:to-pink-950/20 dark:border-red-800/30 dark:shadow-red-900/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-primary-500 to-pink-500 dark:from-primary-400 dark:to-pink-400" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'mb-2 font-bold text-base tracking-tight text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-sm leading-relaxed text-foreground/80 [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
