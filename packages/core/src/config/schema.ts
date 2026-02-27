import type { SheetsDB } from '@gsquery/core'

export { schema, createDB, createTestDB } from '../generated/client.js'
export type { Tables, Counter } from '../generated/index.js'

export type AppDB = SheetsDB<import('../generated/client.js').Tables>
