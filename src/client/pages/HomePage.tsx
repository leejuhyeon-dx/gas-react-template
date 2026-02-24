export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        GAS + React Template
      </h1>
      <p className="text-gray-600 mb-6">
        A minimal template for building web apps on Google Apps Script with React.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Getting Started</h2>
        <ol className="list-decimal list-inside text-blue-700 space-y-1">
          <li>Set your script ID in <code className="bg-blue-100 px-1 rounded">.clasp.json</code></li>
          <li>Run <code className="bg-blue-100 px-1 rounded">pnpm run build</code> to build</li>
          <li>Run <code className="bg-blue-100 px-1 rounded">pnpm run push</code> to deploy to GAS</li>
        </ol>
      </div>
    </div>
  )
}
