/**
 * GAS Backend Entry Point
 *
 * Global functions exported here are available to GAS:
 * - doGet: Web app entry point
 * - include: HTML template includes
 * - apiGet: GET API dispatcher
 * - apiPost: POST API dispatcher
 */

/**
 * Web app entry point - serves the React SPA.
 */
export function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('GAS+React App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

/**
 * Include HTML partials (used for the GAS include pattern).
 */
export function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

/**
 * GET API dispatcher.
 * Add your read actions here.
 */
export function apiGet(
  action: string,
  params: Record<string, string> = {}
): unknown {
  switch (action) {
    case 'ping':
      return { message: 'pong', timestamp: new Date().toISOString() }

    case 'hello':
      return { message: `Hello, ${params.name || 'World'}!` }

    default:
      throw new Error(`Unknown GET action: ${action}`)
  }
}

/**
 * POST API dispatcher.
 * Add your write actions here.
 */
export function apiPost(
  action: string,
  data: Record<string, unknown> = {}
): unknown {
  switch (action) {
    case 'echo':
      return { echo: data }

    default:
      throw new Error(`Unknown POST action: ${action}`)
  }
}
