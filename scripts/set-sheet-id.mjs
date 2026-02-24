#!/usr/bin/env node
/**
 * Set SPREADSHEET_ID as a GAS script property via clasp run.
 * Usage: node scripts/set-sheet-id.mjs <spreadsheet-id>
 */

import { spawnSync } from 'child_process'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CLASP_JSON = join(ROOT, '.clasp.json')

const spreadsheetId = process.argv[2]
if (!spreadsheetId) {
  console.error('Usage: node scripts/set-sheet-id.mjs <spreadsheet-id>')
  console.error('')
  console.error('Spreadsheet ID is the part in the URL:')
  console.error('https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit')
  process.exit(1)
}

// Use Apps Script API to set script property
const config = JSON.parse(readFileSync(CLASP_JSON, 'utf-8'))
const scriptId = config.scriptId

console.log(`📋 Setting SPREADSHEET_ID for script ${scriptId}...`)
console.log(`   ID: ${spreadsheetId}`)

// Use clasp run to call setSpreadsheetId function
const result = spawnSync(
  'pnpm',
  ['exec', 'clasp', 'run', 'setSpreadsheetId', '--params', JSON.stringify([spreadsheetId])],
  { cwd: ROOT, encoding: 'utf-8' }
)

if (result.status !== 0) {
  const output = (result.stdout || '') + (result.stderr || '')

  // clasp run requires Apps Script API enabled — provide fallback instructions
  if (output.includes('Apps Script API') || output.includes('403') || output.includes('not enabled')) {
    console.log('')
    console.log('⚠️  clasp run が使用できません。手動で設定してください:')
    console.log('')
    console.log(`   1. GASエディタを開く: https://script.google.com/d/${scriptId}/edit`)
    console.log('   2. エディタのコンソールで以下を実行:')
    console.log('')
    console.log(`      PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', '${spreadsheetId}')`)
    console.log('')
  } else {
    console.error('❌ Failed:')
    process.stdout.write(result.stdout || '')
    process.stderr.write(result.stderr || '')
  }
  process.exit(1)
}

process.stdout.write(result.stdout || '')
console.log('✅ SPREADSHEET_ID を設定しました')
