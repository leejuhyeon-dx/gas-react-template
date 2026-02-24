/**
 * GAS API Base Client
 * Wraps google.script.run for type-safe API calls
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

/**
 * Wrap google.script.run in a Promise.
 */
export function gasCall<T>(
  action: string,
  method: 'get' | 'post',
  data?: Record<string, unknown>
): Promise<T> {
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
      handler.apiGet(action, data as Record<string, string>)
    } else {
      handler.apiPost(action, data)
    }
  })
}

export function apiGet<T>(action: string, params?: Record<string, string>): Promise<T> {
  return gasCall<T>(action, 'get', params)
}

export function apiPost<T>(action: string, data?: Record<string, unknown>): Promise<T> {
  return gasCall<T>(action, 'post', data)
}
