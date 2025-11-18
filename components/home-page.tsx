import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to introduction page
    navigate('/docs/introduction')
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-muted-foreground">Redirecting...</div>
    </div>
  )
}

