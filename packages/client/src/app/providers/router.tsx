import { HashRouter } from 'react-router-dom'
import type { ReactNode } from 'react'

export function RouterProvider({ children }: { children: ReactNode }) {
  return <HashRouter>{children}</HashRouter>
}
