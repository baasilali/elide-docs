import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDocBySlug as getDocConfig } from '../lib/docs-config'
import type { DocContent } from '../lib/mdx'

export function DocPage() {
  const { slug } = useParams<{ slug: string }>()
  const [doc, setDoc] = useState<DocContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    // Fetch doc from API endpoint
    fetch(`/api/docs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Document not found')
        return res.json()
      })
      .then(data => {
        setDoc(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (error || !doc) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-destructive">Document not found</div>
      </div>
    )
  }

  const docConfig = slug ? getDocConfig(slug) : null

  return (
    <article className="prose prose-invert max-w-none">
      <div className="not-prose mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="text-xl text-muted-foreground text-pretty">
            {doc.frontmatter.description}
          </p>
        )}
      </div>

      <div className="mdx-content">
        {/* MDX content would be rendered here */}
        {/* This requires additional setup with MDX runtime */}
        <div dangerouslySetInnerHTML={{ __html: doc.content }} />
      </div>
    </article>
  )
}

