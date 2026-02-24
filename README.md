# GAS + React Template

Minimal template for building web apps on Google Apps Script with React.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Google Apps Script
- **Build**: esbuild + Babel (template-literals transform)
- **Deploy**: clasp

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set your GAS script ID in `.clasp.json`:
   ```json
   {
     "scriptId": "YOUR_SCRIPT_ID_HERE",
     "rootDir": "build"
   }
   ```
4. Login to clasp:
   ```bash
   pnpm exec clasp login
   ```

## Commands

```bash
pnpm run build              # Build for production
pnpm run push               # Build + push to GAS
pnpm run deploy             # Build + push + deploy (dev)
pnpm run deploy:production  # Build + push + deploy (production)
```

## Project Structure

```
src/
├── client/           # React frontend
│   ├── main.tsx      # Entry point
│   ├── App.tsx       # Root component (HashRouter)
│   ├── pages/        # Page components
│   ├── api/          # GAS API wrapper (gasCall)
│   └── styles/       # Tailwind CSS
└── server/           # GAS backend
    └── index.ts      # doGet, apiGet, apiPost, include
```

## How It Works

- **HashRouter** is used because GAS doesn't support HTML5 History API
- **esbuild** bundles the React app into a single IIFE, then Babel transforms template literals for GAS compatibility
- **CSS is inlined** into `index.html`, JS is loaded via GAS `include()` pattern
- **`escapeJsForGas`** escapes `</script>` and `://` patterns that break GAS HTML embedding
- Server code is bundled as ESM then stripped of `import`/`export` for GAS `.gs` format
