#!/usr/bin/env node
/**
 * Deploy to dev or production. Builds, pushes, then deploys.
 * First-time: creates deployment and saves ID to .clasp.json.
 * Subsequent: updates existing deployment by ID.
 */

import { execSync, spawnSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import * as readline from 'readline'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CLASP_JSON = join(ROOT, '.clasp.json')

function usage() {
  console.error('Usage: node scripts/deploy.mjs <dev|production>')
  process.exit(1)
}

function loadClaspConfig() {
  return JSON.parse(readFileSync(CLASP_JSON, 'utf-8'))
}

function saveClaspConfig(config) {
  writeFileSync(CLASP_JSON, JSON.stringify(config, null, 4) + '\n', 'utf-8')
}

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

function parseDeploymentIdFromOutput(stdout) {
  const match = stdout.match(/^-\s+(\S+)\s+@\d+/m)
  return match ? match[1] : null
}

function getLatestDeploymentId() {
  const result = spawnSync('pnpm', ['exec', 'clasp', 'deployments'], {
    cwd: ROOT,
    encoding: 'utf-8',
  })
  if (result.status !== 0) return null
  const match = result.stdout.match(/^-\s+(\S+)\s+@\d+/m)
  return match ? match[1] : null
}

async function main() {
  const env = process.argv[2]
  if (env !== 'dev' && env !== 'production') {
    usage()
  }

  console.log(`\n📦 Deploy (${env})`)
  console.log('   Building...')
  execSync('node scripts/build.mjs', { cwd: ROOT, stdio: 'inherit' })
  console.log('   Pushing...')
  execSync('pnpm exec clasp push --force', { cwd: ROOT, stdio: 'inherit' })

  const config = loadClaspConfig()
  const key = env === 'dev' ? 'deploymentIdDev' : 'deploymentIdProduction'
  let deploymentId = (config[key] || '').trim()

  let description
  if (env === 'production') {
    description = await prompt('Deployment name (description): ')
    if (!description) {
      console.error('❌ Deployment name is required for production.')
      process.exit(1)
    }
  } else {
    description = 'Dev'
  }

  if (deploymentId) {
    console.log('   Deploying (update existing)...')
    execSync(
      `pnpm exec clasp deploy --deploymentId ${deploymentId} --description "${description}"`,
      { cwd: ROOT, stdio: 'inherit' }
    )
  } else {
    console.log('   Deploying (new deployment)...')
    const result = spawnSync(
      'pnpm',
      ['exec', 'clasp', 'deploy', '--description', description],
      { cwd: ROOT, encoding: 'utf-8' }
    )
    if (result.status !== 0) {
      process.stdout.write(result.stdout)
      process.stderr.write(result.stderr)
      process.exit(result.status || 1)
    }
    const output = result.stdout + result.stderr
    deploymentId =
      parseDeploymentIdFromOutput(output) || getLatestDeploymentId()
    if (!deploymentId) {
      console.error(
        '❌ Could not determine new deployment ID. Run: pnpm exec clasp deployments'
      )
      process.exit(1)
    }
    config[key] = deploymentId
    saveClaspConfig(config)
    console.log(`   Saved ${key} to .clasp.json`)
  }

  const scriptId = config.scriptId
  console.log(
    `\n✅ Deployed! URL: https://script.google.com/macros/s/${deploymentId}/exec`
  )
  console.log(
    `   Editor: https://script.google.com/d/${scriptId}/edit`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
