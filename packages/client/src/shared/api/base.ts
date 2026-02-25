/**
 * API Client - Dual mode
 * - Development (Vite): fetch() via proxy to dev-server
 * - Production (GAS): google.script.run
 */

declare const google: {
  script: {
    run: {
      withSuccessHandler: <T>(callback: (result: T) => void) => {
        withFailureHandler: (callback: (error: Error) => void) => {
          apiGet: (action: string, params?: Record<string, string>) => void
          apiPost: (action: string, data?: Record<string, unknown>) => void
        }
      }
    }
  }
}

const isGas = typeof google !== 'undefined' && !!google?.script?.run

function undefinedToNull(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = value === undefined ? null : value
  }
  return result
}

export function gasCall<T>(
  action: string,
  method: 'get' | 'post',
  data?: Record<string, unknown>
): Promise<T> {
  // Dev mode: fetch via proxy to dev-server
  if (!isGas) {
    if (method === 'get') {
      const params = new URLSearchParams({ action, ...((data as Record<string, string>) || {}) })
      return fetch(`/api?${params}`)
        .then((res) => res.json() as Promise<T>)
        .then((result) => {
          if (result && typeof result === 'object' && 'error' in result) {
            throw new Error((result as { error: string }).error)
          }
          return result
        })
    } else {
      return fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...(data || {}) }),
      })
        .then((res) => res.json() as Promise<T>)
        .then((result) => {
          if (result && typeof result === 'object' && 'error' in result) {
            throw new Error((result as { error: string }).error)
          }
          return result
        })
    }
  }

  // Production: google.script.run
  return new Promise((resolve, reject) => {
    const handler = google.script.run
      .withSuccessHandler((result: T) => {
        if (result && typeof result === 'object' && 'error' in result) {
          reject(new Error((result as { error: string }).error))
        } else {
          resolve(result)
        }
      })
      .withFailureHandler((error: Error) => reject(error))

    if (method === 'get') {
      handler.apiGet(action, (data as Record<string, string>) || {})
    } else {
      handler.apiPost(action, data ? undefinedToNull(data) : {})
    }
  })
}

export function apiGet<T>(action: string, params?: Record<string, string>): Promise<T> {
  return gasCall<T>(action, 'get', params)
}

export function apiPost<T>(action: string, data?: Record<string, unknown>): Promise<T> {
  return gasCall<T>(action, 'post', data)
}
