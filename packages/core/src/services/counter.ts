import { getDB } from '../config'
import { now } from '../lib'

const DEFAULT_ID = 'default'

function ensureCounter() {
  const db = getDB()
  const existing = db.from('Counter').repo.findByIdOrNull(DEFAULT_ID)
  if (!existing) {
    db.from('Counter').create({ id: DEFAULT_ID, value: 0, updatedAt: now() })
  }
}

export function getCount(): { count: number } {
  ensureCounter()
  const row = getDB().from('Counter').findById(DEFAULT_ID)
  return { count: row.value }
}

export function increment(): { count: number } {
  ensureCounter()
  const db = getDB()
  const row = db.from('Counter').findById(DEFAULT_ID)
  const updated = db.from('Counter').update(DEFAULT_ID, {
    value: row.value + 1,
    updatedAt: now(),
  })
  return { count: updated.value }
}

export function decrement(): { count: number } {
  ensureCounter()
  const db = getDB()
  const row = db.from('Counter').findById(DEFAULT_ID)
  const updated = db.from('Counter').update(DEFAULT_ID, {
    value: row.value - 1,
    updatedAt: now(),
  })
  return { count: updated.value }
}

export function reset(): { count: number } {
  ensureCounter()
  const updated = getDB().from('Counter').update(DEFAULT_ID, {
    value: 0,
    updatedAt: now(),
  })
  return { count: updated.value }
}

export function setCount(value: number): { count: number } {
  ensureCounter()
  const updated = getDB().from('Counter').update(DEFAULT_ID, {
    value,
    updatedAt: now(),
  })
  return { count: updated.value }
}
