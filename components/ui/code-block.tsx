import * as React from 'react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: 'javascript' | 'typescript' | 'python' | 'bash' | 'json' | 'jsx' | 'tsx' | 'shell'
  title?: string
  showLineNumbers?: boolean
  className?: string
}

/**
 * CodeBlock component for displaying syntax-highlighted code
 * 
 * @example
 * ```tsx
 * <CodeBlock language="javascript" title="server.js">
 * {`const app = Elide.http
 * app.router.handle("GET", "/", (req, res) => {
 *   res.send(200, "Hello!")
 * })`}
 * </CodeBlock>
 * ```
 */
export function CodeBlock({
  children,
  language = 'javascript',
  title,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const lines = children.trim().split('\n')

  return (
    <div className={cn('my-6', className)}>
      {title && (
        <div className="px-4 py-2 bg-muted/50 border border-border border-b-0 rounded-t-xl text-sm text-muted-foreground font-mono">
          {title}
        </div>
      )}
      <pre className={cn('overflow-x-auto', title && 'rounded-t-none')}>
        <code className={`language-${language}`}>
          {showLineNumbers ? (
            <div className="flex">
              <div className="pr-4 text-muted-foreground select-none border-r border-border/50">
                {lines.map((_, i) => (
                  <div key={i} className="text-right">
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="pl-4 flex-1">{children.trim()}</div>
            </div>
          ) : (
            children.trim()
          )}
        </code>
      </pre>
    </div>
  )
}

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

/**
 * InlineCode component for inline code snippets
 * 
 * @example
 * ```tsx
 * Use <InlineCode>const app</InlineCode> to define a constant
 * ```
 */
export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code className={cn('px-2 py-0.5 rounded-md text-[0.9em] font-mono', className)}>
      {children}
    </code>
  )
}

