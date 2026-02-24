export function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">このテンプレートについて</h1>
      <p className="text-gray-600 mb-4">
        Google Apps Script 上で React Webアプリを構築するための
        ビルドパイプラインとGAS連携インフラを提供するテンプレートです。
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">技術スタック</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>React 18 + TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Google Apps Script（バックエンド）</li>
        <li>Google スプレッドシート（データベース）</li>
        <li>esbuild（バンドラー）</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">仕組み</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>フロントエンドから <code className="bg-gray-100 px-1 rounded">google.script.run</code> でGAS関数を呼び出し</li>
        <li>バックエンドでスプレッドシートAPIを使ってデータを読み書き</li>
        <li>HashRouter を使用（GASはHTML5 History API未対応のため）</li>
      </ul>
    </div>
  )
}
