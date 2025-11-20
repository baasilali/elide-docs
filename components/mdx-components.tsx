/**
 * MDX Components
 * 
 * Pre-configured components for use in MDX documentation files.
 * Import these at the top of your MDX file to use enhanced formatting.
 * 
 * @example
 * ```mdx
 * ---
 * title: "My Documentation"
 * ---
 * 
 * import { CodeBlock, ComparisonTable, Callout } from '@/components/mdx-components'
 * 
 * <Callout title="Note">
 *   Important information here!
 * </Callout>
 * ```
 */

// Code components
export { CodeBlock, InlineCode } from './ui/code-block'

// Table components
export { ComparisonTable, SimpleTable } from './ui/comparison-table'

// Alert/Callout components
export { Callout } from './ui/callout'
export { Alert, AlertTitle, AlertDescription } from './ui/alert'

// Card components (already available)
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'

// Badge component
export { Badge } from './ui/badge'

