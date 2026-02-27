import { useState, useEffect, useCallback } from 'react'
import { fetchCount, incrementCount, decrementCount, resetCount } from '@/entities/counter'

export function HomePage() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCount = useCallback(async () => {
    try {
      setError(null)
      const res = await fetchCount()
      setCount(res.count)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCount()
  }, [loadCount])

  const handleAction = async (action: () => Promise<{ count: number }>) => {
    try {
      setError(null)
      const res = await action()
      setCount(res.count)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'エラーが発生しました')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        GAS + React テンプレート
      </h1>
      <p className="text-gray-600 mb-8">
        Google スプレッドシートと連携したカウンターのデモです。
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          スプレッドシート カウンター
        </h2>

        {loading ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        ) : (
          <>
            <div className="text-6xl font-bold text-center text-blue-600 my-8">
              {count}
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleAction(decrementCount)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-lg transition-colors"
              >
                -1
              </button>
              <button
                onClick={() => handleAction(resetCount)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors"
              >
                リセット
              </button>
              <button
                onClick={() => handleAction(incrementCount)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-lg transition-colors"
              >
                +1
              </button>
            </div>
          </>
        )}

        <p className="text-xs text-gray-400 mt-6 text-center">
          値はスプレッドシートの「Counter」テーブルに保存されます
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">はじめに</h2>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li><code className="bg-blue-100 px-1 rounded">pnpm run setup</code> でGASプロジェクトを作成</li>
          <li><code className="bg-blue-100 px-1 rounded">pnpm dev</code> でローカル開発サーバーを起動</li>
          <li><code className="bg-blue-100 px-1 rounded">pnpm build</code> でビルド</li>
          <li><code className="bg-blue-100 px-1 rounded">pnpm push</code> でGASにデプロイ</li>
        </ol>
      </div>
    </div>
  )
}
