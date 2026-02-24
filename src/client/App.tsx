import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { SettingsPage } from './pages/SettingsPage'

export function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-6">
            <span className="font-bold text-gray-900">GAS+React</span>
            <Link to="/" className="text-gray-600 hover:text-gray-900">ホーム</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">について</Link>
            <Link to="/settings" className="text-gray-600 hover:text-gray-900">設定</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
