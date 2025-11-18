import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from '../components/docs-layout'
import { DocPage } from '../components/doc-page'
import { HomePage } from '../components/home-page'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs/:slug" element={
        <DocsLayout>
          <DocPage />
        </DocsLayout>
      } />
    </Routes>
  )
}

