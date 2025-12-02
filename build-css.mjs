#!/usr/bin/env node
import { exec } from 'child_process'
import { promisify } from 'util'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

const execAsync = promisify(exec)

// Build CSS using Tailwind CLI
async function buildCSS() {
  console.log('[CSS] Building CSS...')
  
  // Ensure public directory exists
  if (!existsSync('public')) {
    await mkdir('public', { recursive: true })
  }
  
  // Run Tailwind CLI to compile CSS
  try {
    await execAsync('npx @tailwindcss/cli@latest -i styles/globals.css -o public/styles.css --minify')
    console.log('[OK] CSS built to public/styles.css')
  } catch (error) {
    console.error('[FAIL] CSS build failed:', error.message)
    throw error
  }
}

buildCSS().catch(console.error)


