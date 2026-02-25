/**
 * Dev Server - Hono + MockAdapter
 *
 * Local development API server that mimics GAS behavior
 * using in-memory MockAdapter for storage.
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { MockAdapter } from '@gsquery/core'
import {
  setDB,
  createDB,
  handleGet,
  handlePost,
} from '@gas-app/core'
import type { Counter } from '@gas-app/core'

// --- DB Initialization with MockAdapter ---

setDB(
  createDB({
    Counter: new MockAdapter<Counter>({ idMode: 'client' }),
  })
)

// --- Hono App ---

const app = new Hono()

app.use('/api/*', cors())

app.get('/api', async (c) => {
  const action = c.req.query('action') || ''
  const params: Record<string, string> = {}
  for (const [key, value] of Object.entries(c.req.query())) {
    if (key !== 'action') params[key] = value
  }
  const result = handleGet(action, params)
  return c.json(result)
})

app.post('/api', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  const { action, ...data } = body as { action: string; [key: string]: unknown }
  const result = handlePost(action || '', data)
  return c.json(result)
})

const port = 3001
console.log(`Dev server running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
