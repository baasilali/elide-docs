import * as React from 'react'
import { cn } from '@/lib/utils'

interface ComparisonColumn {
  title: string
  isHighlight?: boolean
}

interface ComparisonRow {
  metric: string
  values: (string | number)[]
}

interface ComparisonTableProps {
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  className?: string
}

/**
 * ComparisonTable component for displaying performance comparisons
 * 
 * @example
 * ```tsx
 * <ComparisonTable
 *   columns={[
 *     { title: 'Metric' },
 *     { title: 'Elide (Native)', isHighlight: true },
 *     { title: 'Node.js' },
 *     { title: 'Deno' }
 *   ]}
 *   rows={[
 *     { metric: 'Cold Start', values: ['~5ms', '~500ms', '~100ms'] },
 *     { metric: 'Memory', values: ['~10MB', '~50MB', '~40MB'] }
 *   ]}
 * />
 * ```
 */
export function ComparisonTable({ columns, rows, className }: ComparisonTableProps) {
  return (
    <div className={cn('overflow-x-auto my-8', className)}>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="text-left py-4 px-6">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="py-4 px-6 font-semibold">{row.metric}</td>
              {row.values.map((value, colIdx) => {
                const isHighlight = columns[colIdx + 1]?.isHighlight
                return (
                  <td
                    key={colIdx}
                    className={cn(
                      'py-4 px-6 font-mono',
                      isHighlight
                        ? 'text-green-400 font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface SimpleTableProps {
  headers: string[]
  rows: (string | React.ReactNode)[][]
  className?: string
}

/**
 * SimpleTable component for basic tables
 * 
 * @example
 * ```tsx
 * <SimpleTable
 *   headers={['Name', 'Type', 'Description']}
 *   rows={[
 *     ['app', 'Object', 'The main application instance'],
 *     ['router', 'Router', 'HTTP router for handling requests']
 *   ]}
 * />
 * ```
 */
export function SimpleTable({ headers, rows, className }: SimpleTableProps) {
  return (
    <div className={cn('overflow-x-auto my-8', className)}>
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="text-left py-4 px-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="py-4 px-6">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

