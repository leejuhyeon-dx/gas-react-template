/**
 * GAS Server Entry Point
 *
 * Initializes SheetsAdapter for Google Sheets and exposes
 * GAS global functions: doGet, include, apiGet, apiPost
 */

import { SheetsAdapter } from '@gsquery/core'
import {
  setDB,
  createDB,
  schema,
  handleGet,
  handlePost,
} from '@gas-app/core'
import type { Tables } from '@gas-app/core'
import type { DataStore } from '@gsquery/core'

// Build-time spreadsheet ID (injected by esbuild from .clasp.json)
declare const __SPREADSHEET_ID__: string

function getSpreadsheetId(): string | undefined {
  const active = SpreadsheetApp.getActiveSpreadsheet()
  if (active) return active.getId()

  const propId =
    PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')
  if (propId) return propId

  if (typeof __SPREADSHEET_ID__ !== 'undefined' && __SPREADSHEET_ID__) {
    return __SPREADSHEET_ID__
  }

  return undefined
}

// --- DB Initialization ---

let _initialized = false

function ensureDB() {
  if (_initialized) return
  _initialized = true

  const spreadsheetId = getSpreadsheetId()
  const stores: Record<string, DataStore<Tables[keyof Tables]>> = {}

  for (const [tableName, tableSchema] of Object.entries(schema.tables)) {
    stores[tableName] = new SheetsAdapter({
      spreadsheetId,
      sheetName: tableSchema.sheetName || tableName,
      columns: [...tableSchema.columns],
      idMode: 'client',
    })
  }

  setDB(createDB(stores as { [K in keyof Tables]: DataStore<Tables[K]> }))
}

// --- GAS Exports ---

export function doGet(e: GoogleAppsScript.Events.DoGet) {
  const tpl = HtmlService.createTemplateFromFile('index')
  tpl.initialPath = e?.parameter?.path || ''
  return tpl
    .evaluate()
    .setTitle('GAS+React App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

export function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

export function apiGet(
  action: string,
  params: Record<string, string> = {}
): unknown {
  ensureDB()
  return handleGet(action, params)
}

export function apiPost(
  action: string,
  data: Record<string, unknown> = {}
): unknown {
  ensureDB()
  return handlePost(action, data)
}
