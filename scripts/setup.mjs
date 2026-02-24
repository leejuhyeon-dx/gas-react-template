#!/usr/bin/env node
/**
 * Setup script: create a new GAS webapp project.
 * - Checks clasp login
 * - Runs clasp create --type webapp
 * - Builds and pushes initial code
 */

import { execSync, spawnSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import * as readline from 'readline'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CLASP_JSON = join(ROOT, '.clasp.json')

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  console.log('\n🚀 GAS + React Template Setup\n')

  // Check if already configured
  if (existsSync(CLASP_JSON)) {
    const config = JSON.parse(readFileSync(CLASP_JSON, 'utf-8'))
    if (config.scriptId && config.scriptId !== 'YOUR_SCRIPT_ID_HERE') {
      console.log(`⚠️  .clasp.json already exists (scriptId: ${config.scriptId})`)
      const answer = await prompt('Overwrite and create a new project? (y/N): ')
      if (answer.toLowerCase() !== 'y') {
        console.log('Cancelled.')
        process.exit(0)
      }
    }
  }

  // Check clasp login
  const loginCheck = spawnSync('pnpm', ['exec', 'clasp', 'login', '--status'], {
    cwd: ROOT,
    encoding: 'utf-8',
  })
  if (loginCheck.status !== 0 || loginCheck.stdout.includes('not logged in')) {
    console.log('📋 Not logged in to clasp. Starting login...\n')
    execSync('pnpm exec clasp login', { cwd: ROOT, stdio: 'inherit' })
  }

  // Get project title
  const title = (await prompt('Project title (default: "GAS React App"): ')) || 'GAS React App'

  // Create webapp project
  console.log(`\n📦 Creating GAS webapp project: "${title}"...`)
  const result = spawnSync(
    'pnpm',
    ['exec', 'clasp', 'create', '--type', 'webapp', '--title', title, '--rootDir', 'build'],
    { cwd: ROOT, encoding: 'utf-8' }
  )

  if (result.status !== 0) {
    console.error('❌ Failed to create project:')
    process.stderr.write(result.stderr)
    process.exit(1)
  }
  process.stdout.write(result.stdout)

  // Verify .clasp.json was created
  if (!existsSync(CLASP_JSON)) {
    console.error('❌ .clasp.json was not created.')
    process.exit(1)
  }

  const config = JSON.parse(readFileSync(CLASP_JSON, 'utf-8'))
  console.log(`✅ Project created (scriptId: ${config.scriptId})`)

  // Ensure rootDir is set
  if (!config.rootDir) {
    config.rootDir = 'build'
    writeFileSync(CLASP_JSON, JSON.stringify(config, null, 4) + '\n', 'utf-8')
  }

  // Build and push
  console.log('\n📦 Building and pushing initial code...')
  execSync('node scripts/build.mjs', { cwd: ROOT, stdio: 'inherit' })
  execSync('pnpm exec clasp push --force', { cwd: ROOT, stdio: 'inherit' })

  console.log(`\n🎉 Setup complete!`)
  console.log(`   Editor: https://script.google.com/d/${config.scriptId}/edit`)
  console.log(`\n   Next steps:`)
  console.log(`   1. pnpm run deploy        # Deploy as dev`)
  console.log(`   2. pnpm exec clasp open   # Open in browser`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
