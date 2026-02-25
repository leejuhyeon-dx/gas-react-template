import type { AppDB } from './schema'

let _db: AppDB | null = null

export function setDB(db: AppDB): void {
  _db = db
}

export function getDB(): AppDB {
  if (!_db) {
    throw new Error('DB not initialized. Call setDB() first.')
  }
  return _db
}

export function hasDB(): boolean {
  return _db !== null
}
