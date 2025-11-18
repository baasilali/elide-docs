#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Simple CSS build script
async function buildCSS() {
  console.log('📦 Building CSS...')
  
  // Ensure public directory exists
  if (!existsSync('public')) {
    await mkdir('public', { recursive: true })
  }
  
  // Read the globals.css
  const css = await readFile('styles/globals.css', 'utf-8')
  
  // For now, copy as-is (Tailwind v4 supports this)
  // In production, you'd want to run through PostCSS/Tailwind CLI
  await writeFile('public/styles.css', css)
  
  console.log('✓ CSS built to public/styles.css')
}

buildCSS().catch(console.error)

