import { useState, useEffect } from 'react'
import { apiGet, apiPost } from '../api/base'

export function SettingsPage() {
  const [spreadsheetId, setSpreadsheetId] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiGet<{ spreadsheetId: string }>('getConfig')
      .then((res) => setSpreadsheetId(res.spreadsheetId))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    try {
      setError(null)
      setSaved(false)
      await apiPost('setSpreadsheetId', { id: spreadsheetId })
      setSaved(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'エラーが発生しました')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">設定</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          スプレッドシート接続
        </h2>

        {loading ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              スプレッドシートID
            </label>
            <p className="text-xs text-gray-400 mb-2">
              URLの <code className="bg-gray-100 px-1 rounded">https://docs.google.com/spreadsheets/d/<b>ここの部分</b>/edit</code>
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={spreadsheetId}
                onChange={(e) => {
                  setSpreadsheetId(e.target.value)
                  setSaved(false)
                }}
                placeholder="1ABC...xyz"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                保存
              </button>
            </div>

            {saved && (
              <p className="text-green-600 text-sm mt-2">
                保存しました
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
