import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom'
import { RouterProvider } from './providers/router'
import { AppRoutes } from './routes/routes'
import './styles/index.css'

function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-6">
            <span className="font-bold text-gray-900">GAS+React</span>
            <Link to="/" className="text-gray-600 hover:text-gray-900">ホーム</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">について</Link>
          </div>
        </nav>
        <AppRoutes />
      </div>
    </RouterProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
