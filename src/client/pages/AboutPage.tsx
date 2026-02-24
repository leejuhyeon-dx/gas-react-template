export function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About</h1>
      <p className="text-gray-600 mb-4">
        This template provides the build pipeline and GAS-React integration
        infrastructure needed to build web apps on Google Apps Script.
      </p>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Tech Stack</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>React 18 + TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Google Apps Script (backend)</li>
        <li>esbuild (bundler)</li>
      </ul>
    </div>
  )
}
