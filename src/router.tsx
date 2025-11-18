/**
 * Client-side routing setup
 */

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'

export function Router() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

