import * as counterService from '../services/counter'

export function handleGet(
  action: string,
  _params: Record<string, string> = {}
): unknown {
  try {
    switch (action) {
      case 'getCount':
        return counterService.getCount()

      case 'ping':
        return { message: 'pong', timestamp: new Date().toISOString() }

      default:
        return { error: `Unknown GET action: ${action}` }
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

export function handlePost(
  action: string,
  data: Record<string, unknown> = {}
): unknown {
  try {
    switch (action) {
      case 'increment':
        return counterService.increment()

      case 'decrement':
        return counterService.decrement()

      case 'reset':
        return counterService.reset()

      case 'setCount': {
        const value = Number(data.value) || 0
        return counterService.setCount(value)
      }

      default:
        return { error: `Unknown POST action: ${action}` }
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) }
  }
}
