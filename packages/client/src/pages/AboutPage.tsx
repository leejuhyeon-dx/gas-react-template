export function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">このテンプレートについて</h1>
      <p className="text-gray-600 mb-4">
        Google Apps Script 上で React Webアプリを構築するための
        モノレポテンプレートです。
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">技術スタック</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>React 18 + TypeScript</li>
        <li>Tailwind CSS</li>
        <li>@gsquery/core（スプレッドシートORM）</li>
        <li>Google Apps Script（バックエンド）</li>
        <li>Hono（ローカル開発サーバー）</li>
        <li>esbuild（バンドラー）</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">アーキテクチャ</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded">@gas-app/core</code> — 共有ビジネスロジック（gsquery）</li>
        <li><code className="bg-gray-100 px-1 rounded">@gas-app/gas-server</code> — GAS本番サーバー</li>
        <li><code className="bg-gray-100 px-1 rounded">@gas-app/dev-server</code> — ローカル開発API</li>
        <li><code className="bg-gray-100 px-1 rounded">@gas-app/client</code> — React フロントエンド（FSD）</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">仕組み</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>開発時: Vite + Hono devサーバー（MockAdapter）</li>
        <li>本番: <code className="bg-gray-100 px-1 rounded">google.script.run</code> でGAS関数を呼び出し</li>
        <li>HashRouter を使用（GASはHTML5 History API未対応のため）</li>
      </ul>
    </div>
  )
}
