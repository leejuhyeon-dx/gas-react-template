import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}
