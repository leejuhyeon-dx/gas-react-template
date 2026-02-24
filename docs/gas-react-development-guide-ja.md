# GAS + React 開発ガイド

> AIでアプリを作る開発者へ — なぜこのアーキテクチャが存在し、どう使うのか。

---

## TL;DR

Google Apps Script (GAS) を使えば、Googleのインフラ上にWebアプリを**無料で**デプロイできる。しかしGAS単体での開発は辛い — モジュールなし、モダンJSなし、コンポーネントシステムなし。このテンプレートはフロントエンドに**React + TypeScript + Tailwind CSS**、データベースに**Google Sheets**、そしてすべてをGAS互換ファイルにバンドルするビルドパイプラインを提供する。アーキテクチャ全体が**AIエージェント（Claude、Cursor等）が効率的に開発できる**ように設計されている。

---

## 目次

1. [問題：なぜ単なるHTMLではダメなのか？](#1-問題なぜ単なるhtmlではダメなのか)
2. [アーキテクチャ概要](#2-アーキテクチャ概要)
3. [なぜこの構成なのか？](#3-なぜこの構成なのか)
4. [なぜAIエージェントに有利なのか](#4-なぜaiエージェントに有利なのか)
5. [プロジェクト構成](#5-プロジェクト構成)
6. [ビルドの仕組み](#6-ビルドの仕組み)
7. [クライアント・サーバー間通信](#7-クライアントサーバー間通信)
8. [開発ワークフロー](#8-開発ワークフロー)
9. [機能追加：実践ガイド](#9-機能追加実践ガイド)
10. [デプロイ](#10-デプロイ)
11. [注意点と制約](#11-注意点と制約)

---

## 1. 問題：なぜ単なるHTMLではダメなのか？

### 「AIにHTML書かせる」アプローチ

こんなワークフローに慣れているかもしれない：

1. AIに「Todoアプリ作って」と指示
2. AIがCSS・JS内蔵の単一HTMLファイルを生成
3. ブラウザで開いて完了

**静的プロトタイプ**には有効だが、以下が必要になった瞬間に破綻する：

- **データ永続化** — タスクをどこに保存する？ LocalStorageはブラウザのクリアで消える。
- **複数ユーザーアクセス** — ローカルHTMLファイルをライブアプリとして共有できない。
- **バックエンドロジック** — 認証、データバリデーション、定期実行ジョブ。
- **デプロイ** — どこにホスティングする？ GitHub Pagesは静的サイトのみ。

### GASという解決策

Google Apps Scriptなら、これらすべてが無料で手に入る：

| 要件 | GASの解決策 |
|------|-----------|
| ホスティング | GoogleがURLでアプリを配信 |
| データベース | Google Sheets（`SpreadsheetApp`で読み書き） |
| 認証 | Google OAuth内蔵 |
| 定期実行 | 時間駆動トリガー |
| メール | `GmailApp.sendEmail()` |
| コスト | **無料**（Googleのクォータ内） |

### GAS単体の問題点

しかし、GASで直接Webアプリを書くのは辛い：

- **モジュールなし** — すべてグローバル。`import`/`export`が使えない。
- **npmなし** — React、Tailwind、その他ライブラリが使えない。
- **ホットリロードなし** — 編集 → プッシュ → 待機 → リフレッシュ。
- **原始的なテンプレート** — GAS HtmlServiceは基本的なサーバーサイドテンプレートのみ。
- **TypeScriptなし** — 型安全性なし、オートコンプリートなし。
- **ファイルサイズ制限** — GASはプロジェクト全体で50MBの上限がある。

### このテンプレートがギャップを埋める

モダンなReact + TypeScriptをローカルで書き、ビルドパイプラインがGAS互換ファイルに変換する：

```
モダンコード (React/TS/Tailwind)  →  ビルド  →  GAS互換ファイル  →  デプロイ
```

---

## 2. アーキテクチャ概要

```
┌─────────────────────────────────────────────────────┐
│                   Google Apps Script                  │
│                                                       │
│  ┌──────────────────┐    ┌──────────────────────┐    │
│  │   index.html     │    │      Code.gs          │    │
│  │  ┌────────────┐  │    │                        │    │
│  │  │ React App  │──│────│→ google.script.run     │    │
│  │  │ (IIFE)     │  │    │                        │    │
│  │  │ + Tailwind │  │    │  doGet()               │    │
│  │  └────────────┘  │    │  apiGet(action, params) │    │
│  │                  │    │  apiPost(action, data)  │    │
│  └──────────────────┘    │                        │    │
│       ブラウザ            │  → Google Sheets       │    │
│       (iframe)            │  → Gmail               │    │
│                          │  → Drive等              │    │
│                          └──────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

**2つの側面、1つのデプロイ：**

| 側面 | 内容 | 実行環境 | 言語 |
|------|------|---------|------|
| **Client** (`src/client/`) | React UI | ブラウザ（GAS iframe） | TypeScript + JSX |
| **Server** (`src/server/`) | API + DB操作 | GAS V8ランタイム | TypeScript → GAS |

---

## 3. なぜこの構成なのか？

### 3.1 関心の分離

`src/client/`と`src/server/`の分割は恣意的なものではない。実際のクライアント・サーバーアーキテクチャを反映している：

```
src/
├── client/          # ブラウザで実行
│   ├── main.tsx     # エントリーポイント
│   ├── App.tsx      # ルートコンポーネント + ルーティング
│   ├── api/         # 通信レイヤー
│   │   └── base.ts  # google.script.runラッパー
│   ├── pages/       # ページコンポーネント
│   └── styles/      # Tailwind CSS
│
└── server/          # Googleサーバーで実行
    └── index.ts     # APIルート + GASエントリーポイント
```

**なぜこれが重要か：**

- **クライアントコード**はGoogle Sheetsに直接触れない。サーバーを呼び出す。
- **サーバーコード**はUIをレンダリングしない。データを返す。
- **APIレイヤー**（`api/base.ts`）が両者の唯一の橋渡し。

つまり、バックエンドロジックに触れずにUIを変更でき、その逆も可能。

### 3.2 スタック全体の型安全性

両側でTypeScriptを使用。APIレスポンスの型を定義すると、サーバー（作成側）とクライアント（使用側）が同じ型契約を共有する：

```typescript
// server/index.ts
case 'tasks':
  return { tasks: getAllTasks() }  // 戻り値の型は推論される

// client/pages/TaskPage.tsx
const { tasks } = await apiGet<{ tasks: Task[] }>('tasks')
// TypeScriptは`tasks`がTask[]であることを知っている
```

### 3.3 シングルビルド、シングルデプロイ

2つの別々のコードベースにもかかわらず、すべてがたった**4ファイル**にコンパイルされる：

```
build/
├── index.html       # HTMLシェル（CSSインライン）
├── app.html         # Reactバンドル（単一の<script>タグ）
├── Code.gs          # すべてのサーバーコード
└── appsscript.json  # GASマニフェスト
```

`pnpm run push`一発ですべてアップロード。フロントエンド/バックエンドの個別デプロイは不要。

---

## 4. なぜAIエージェントに有利なのか

**これが核心セクション。** AI（Claude Code、Cursor、Copilot等）を使ってアプリを開発するなら、このアーキテクチャは生のHTMLや生のGASに対して**圧倒的な優位性**をAIに与える。

### 4.1 明確なファイル境界 = より良いAIコンテキスト

AIエージェントは**1つのファイルに集中して、その目的が明確**な時に最も力を発揮する。

| ファイル | 目的 | AIが正確に理解できる |
|---------|------|---------------------|
| `src/server/index.ts` | APIルート追加 | 「`apiGet`に`case 'users'`を追加」 |
| `src/client/pages/UserPage.tsx` | UI構築 | 「ユーザーを表示するテーブルを作成」 |
| `src/client/api/base.ts` | API呼び出し | 変更は滅多に不要 |

これをHTML、CSS、JS、「バックエンド」ロジックがすべて混在する単一HTMLファイルと比較してみてほしい。AIは機能追加箇所を見つけるために数千行をパースしなければならない。

### 4.2 予測可能なパターン = ミスが減る

テンプレートはAIエージェントがすぐに習得できる**規約**を確立する：

**新しいAPIエンドポイント追加（サーバー）：**
```typescript
// src/server/index.tsで常に同じパターン
case 'newAction':
  return { result: doSomething(params) }
```

**クライアントからの呼び出し：**
```typescript
// 常に同じパターン
const data = await apiGet<ResponseType>('newAction', { key: 'value' })
```

**新しいページ作成：**
```typescript
// 常に：export function + Tailwindクラス
export function NewPage() {
  return <div className="max-w-2xl mx-auto py-12 px-4">...</div>
}
```

AIエージェントは**パターンの繰り返し**が得意。すべての機能が同じ構造に従えば、AIのエラーが減り、修正の手間も減る。

### 4.3 コンポーネントベースUI = AIが組み合わせやすい

Reactコンポーネントなら、AIは：

- 新しいコンポーネントを**独立して作成**できる
- コンポーネントを**組み合わせ**られる
- 1つのコンポーネントを他を壊さずに**修正**できる
- コンポーネントを**クリーンに削除**できる

モノリシックなHTMLファイルでは、機能追加は適切な場所にHTMLを慎重に挿入し、衝突しうるCSS、グローバルスコープを共有するJSを扱うことを意味する。AIエージェントはこのシナリオで頻繁に壊す。

### 4.4 TypeScript = 自己文書化コード

TypeScriptはAIエージェントに**何が期待されているかのコンテキスト**を与える：

```typescript
// AIはこれを読んで即座にデータの形状を把握する
interface Task {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
  assignee?: string
}

// AIは推測なしで正しいAPI呼び出しを生成できる
function apiGet<{ tasks: Task[] }>('tasks')
```

型がなければ、AIはデータの形状を推測しなければならず、ランタイムエラーにつながる。

### 4.5 小さく焦点を絞ったファイル = コンテキストウィンドウに収まる

AIモデルにはコンテキストウィンドウの制限がある。このアーキテクチャはファイルを小さく保つ：

- `src/server/index.ts` — 約60行（ルート追加はここ）
- `src/client/pages/HomePage.tsx` — 約20行（1ファイル1ページ）
- `src/client/api/base.ts` — 約50行（変更は滅多にない）

各ファイルはAIのコンテキストウィンドウに容易に収まるため、AIは**ファイル全体**を見て正確な編集ができる。3000行のHTMLファイルでAIが構造を見失うのとは大違いだ。

### 4.6 ビルドパイプラインがGASの癖を処理

GASにはAIエージェントを引っかける多くの癖がある：

| GASの癖 | ビルドパイプラインが処理 |
|---------|----------------------|
| `import`/`export`不可 | ビルドスクリプトが除去 |
| HtmlServiceでテンプレートリテラルが壊れる | Babelが文字列連結に変換 |
| コード内の`</script>`がHTMLを壊す | `<\/script>`にエスケープ |
| `://`がGASパースを壊す | `:\u002F\u002F`にエスケープ |
| npmモジュール不可 | esbuildがすべてインラインバンドル |

このパイプラインがなければ、AIはこれらすべてのGAS固有のエスケープルールを知り、手動で適用する必要がある — これを頻繁に忘れるか間違える。

### 4.7 AI開発のためのプロンプト例

このテンプレートを使う際にAIに与える効果的なプロンプトの例：

**機能追加：**
> 「Google SheetsからすべてのタスクをGoogle Sheetsから表示する`/tasks`ページを追加して。APIルートを`src/server/index.ts`に、ページコンポーネントを`src/client/pages/TasksPage.tsx`に作成。`App.tsx`にルーティング追加。」

**バックエンドのみ：**
> 「`src/server/index.ts`に`apiPost`アクション`createTask`を追加して。'Tasks'シートに新しい行を書き込む。」

**フロントエンドのみ：**
> 「`src/client/components/TaskForm.tsx`にフォームコンポーネントを作成して。送信時に`apiPost('createTask', { title, status })`を呼び出す。」

**デバッグ：**
> 「`apiGet('tasks')`の呼び出しが空配列を返す。`src/server/index.ts`を読んでSheets API呼び出しを確認して。」

各プロンプトは**特定のファイル**を**特定の目的**でターゲットにしている。これがAI開発を最大限活用する方法だ。

---

## 5. プロジェクト構成

```
gas-react-template/
│
├── src/
│   ├── client/                  # Reactフロントエンド
│   │   ├── main.tsx             # エントリー：<App />を#rootにレンダリング
│   │   ├── App.tsx              # ルートコンポーネント + HashRouterルーティング
│   │   ├── api/
│   │   │   └── base.ts          # google.script.run Promiseラッパー
│   │   ├── pages/
│   │   │   ├── HomePage.tsx     # ホームページ
│   │   │   └── AboutPage.tsx    # Aboutページ
│   │   └── styles/
│   │       └── index.css        # Tailwindディレクティブ (@tailwind base/components/utilities)
│   │
│   └── server/                  # GASバックエンド
│       └── index.ts             # doGet, include, apiGet, apiPost
│
├── scripts/
│   ├── build.mjs                # esbuild + Babel + HTML生成
│   └── deploy.mjs               # ビルド + プッシュ + claspデプロイ
│
├── build/                       # 出力（GASにプッシュされる）
│   ├── index.html               # HTMLシェル（CSSインライン済み）
│   ├── app.html                 # Reactバンドル（<script>タグ内）
│   ├── Code.gs                  # サーバーコード
│   └── appsscript.json          # GASマニフェスト
│
├── .clasp.json                  # clasp設定（スクリプトID、デプロイメントID）
├── appsscript.json              # GASマニフェスト（スコープ、webapp設定）
├── package.json                 # 依存関係とスクリプト
├── tsconfig.json                # TypeScript設定
└── tailwind.config.js           # Tailwind設定
```

---

## 6. ビルドの仕組み

ビルドパイプライン（`scripts/build.mjs`）は5つのことを行う：

### ステップ1：React → IIFEバンドル

```
src/client/main.tsx  →  esbuild  →  dist/app.js（単一ファイル、ミニファイ済み）
```

- すべてのReactコンポーネント、ライブラリ、コードを1ファイルにバンドル
- フォーマット：IIFE（即時実行関数式） — モジュール不要
- すべての`import`文はビルド時に解決

### ステップ2：Tailwind CSSコンパイル

```
src/client/styles/index.css  →  Tailwind CLI  →  dist/app.css（ミニファイ済み）
```

- すべての`.tsx`ファイルをスキャンしてクラス名を検出
- 実際に使用されているクラスのCSSのみ含む（ツリーシェイキング）

### ステップ3：サーバーコード → .gsへトランスパイル

```
src/server/index.ts  →  esbuild  →  dist/Code.js  →  export除去  →  build/Code.gs
```

- TypeScript → JavaScript
- `export`キーワード除去（GASはグローバル関数を使用）
- `import`文除去

### ステップ4：HTMLテンプレート生成

```
dist/app.css + dist/app.js  →  build/index.html + build/app.html
```

- CSSを`index.html`の`<style>`タグにインライン
- JSを`<script>`タグでラップして`app.html`に
- `index.html`はGASの`<?!= include('app') ?>`でJSをロード
- GAS互換のための特殊エスケープ処理：
  - テンプレートリテラル（`` ` ``） → 文字列連結
  - `</script>` → `<\/script>`
  - `://` → `:\u002F\u002F`

### ステップ5：マニフェストコピー

```
appsscript.json  →  build/appsscript.json
```

### ビルドフロー図

```
src/client/main.tsx ──→ esbuild ──→ dist/app.js ──→ escape + babel ──→ build/app.html
src/client/styles/  ──→ tailwind ─→ dist/app.css ──→ inline ─────────→ build/index.html
src/server/index.ts ──→ esbuild ──→ dist/Code.js ─→ export除去 ─────→ build/Code.gs
appsscript.json ─────────────────────────────────────→ copy ─────────→ build/appsscript.json
```

---

## 7. クライアント・サーバー間通信

### 橋渡し：`google.script.run`

GASは`google.script.run`を提供する — ブラウザ側のコードからサーバー側のGAS関数を呼び出す仕組み。このテンプレートはモダンなasync/awaitで使えるようにPromiseでラップしている。

### クライアント側（`src/client/api/base.ts`）

```typescript
// google.script.runをPromiseでラップ
export function gasCall<T>(
  action: string,
  method: 'get' | 'post',
  data?: Record<string, unknown>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const handler = google.script.run
      .withSuccessHandler((result: T) => {
        if (result && typeof result === 'object' && 'error' in result) {
          reject(new Error((result as { error: string }).error))
        } else {
          resolve(result)
        }
      })
      .withFailureHandler((error: Error) => reject(error))

    if (method === 'get') {
      handler.apiGet(action, data as Record<string, string>)
    } else {
      handler.apiPost(action, data)
    }
  })
}

// 便利ヘルパー
export function apiGet<T>(action: string, params?: Record<string, string>): Promise<T>
export function apiPost<T>(action: string, data?: Record<string, unknown>): Promise<T>
```

### サーバー側（`src/server/index.ts`）

```typescript
// GETディスパッチャー — データ読み取り用
export function apiGet(action: string, params: Record<string, string> = {}): unknown {
  switch (action) {
    case 'ping':
      return { message: 'pong', timestamp: new Date().toISOString() }
    case 'hello':
      return { message: `Hello, ${params.name || 'World'}!` }
    default:
      throw new Error(`Unknown GET action: ${action}`)
  }
}

// POSTディスパッチャー — データ書き込み用
export function apiPost(action: string, data: Record<string, unknown> = {}): unknown {
  switch (action) {
    case 'echo':
      return { echo: data }
    default:
      throw new Error(`Unknown POST action: ${action}`)
  }
}
```

### 通信フロー

```
Reactコンポーネント
    │
    ├─ await apiGet('tasks')
    │
    ▼
gasCall('tasks', 'get')
    │
    ├─ google.script.run.apiGet('tasks', {})
    │
    ▼
GASサーバー (Code.gs)
    │
    ├─ apiGet('tasks', {})
    ├─ switch → case 'tasks' → SpreadsheetApp...
    │
    ▼
データ返却 → Promise解決 → React再レンダリング
```

---

## 8. 開発ワークフロー

### 初期セットアップ

```bash
# 1. テンプレートをクローン
git clone <repo-url> my-app
cd my-app

# 2. 依存関係をインストール
pnpm install

# 3. script.google.comでGASプロジェクトを作成
#    プロジェクト設定からスクリプトIDをコピー

# 4. claspを設定
#    .clasp.jsonを編集 → "scriptId": "YOUR_SCRIPT_ID"を設定

# 5. claspにログイン
pnpm exec clasp login

# 6. ビルドしてプッシュ
pnpm run push
```

### 開発サイクル

GASにはホットリロードがない。開発サイクルは：

```
コード編集 → ビルド → プッシュ → ブラウザリフレッシュ
```

```bash
# ビルド + プッシュを1コマンドで
pnpm run push

# ビルドのみ（出力を確認したい場合）
pnpm run build
```

### コマンドリファレンス

| コマンド | 内容 |
|---------|------|
| `pnpm run build` | クライアント + サーバー + HTMLをビルド |
| `pnpm run push` | ビルド + GASにプッシュ |
| `pnpm run deploy` | ビルド + プッシュ + デプロイ（dev） |
| `pnpm run deploy:production` | ビルド + プッシュ + デプロイ（production） |

---

## 9. 機能追加：実践ガイド

### 例：Google Sheetsを使った「タスク」機能の追加

#### ステップ1：APIルートを追加（サーバー）

`src/server/index.ts`を編集：

```typescript
// apiGetのswitchに追加
case 'tasks': {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks')
  if (!sheet) return { tasks: [] }
  const data = sheet.getDataRange().getValues()
  const headers = data[0]
  const tasks = data.slice(1).map(row => ({
    id: row[0],
    title: row[1],
    status: row[2],
  }))
  return { tasks }
}

// apiPostのswitchに追加
case 'createTask': {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks')
  if (!sheet) throw new Error('Tasks sheet not found')
  const id = Utilities.getUuid()
  sheet.appendRow([id, data.title, data.status || 'todo'])
  return { id }
}
```

#### ステップ2：ページコンポーネントを作成（クライアント）

`src/client/pages/TasksPage.tsx`を作成：

```tsx
import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '@/api/base'

interface Task {
  id: string
  title: string
  status: string
}

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    apiGet<{ tasks: Task[] }>('tasks').then(res => setTasks(res.tasks))
  }, [])

  const addTask = async () => {
    if (!title.trim()) return
    await apiPost('createTask', { title, status: 'todo' })
    setTitle('')
    const res = await apiGet<{ tasks: Task[] }>('tasks')
    setTasks(res.tasks)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="New task..."
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="bg-white border rounded p-3">
            {task.title} — <span className="text-gray-500">{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

#### ステップ3：ルートを追加（クライアント）

`src/client/App.tsx`を編集：

```tsx
import { TasksPage } from './pages/TasksPage'

// <Routes>内に追加：
<Route path="/tasks" element={<TasksPage />} />

// ナビゲーションリンクを追加：
<Link to="/tasks">Tasks</Link>
```

#### ステップ4：ビルドしてデプロイ

```bash
pnpm run push
```

以上。3ファイルを触り、1コマンドでデプロイ。

---

## 10. デプロイ

### 開発デプロイ

```bash
pnpm run deploy
# または
pnpm run deploy:dev
```

- 初回：新しいデプロイメントを作成し、IDを`.clasp.json`に保存
- 以降：同じデプロイメントを更新

### 本番デプロイ

```bash
pnpm run deploy:production
```

- 説明の入力を求められる（例：「v1.0.0 - Initial release」）
- 新しいバージョン付きデプロイメントを作成
- デプロイメントIDを`.clasp.json`に保存

### アプリへのアクセス

デプロイ後、アプリは以下のURLで利用可能：

```
https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec
```

### OAuthスコープ

`appsscript.json`を編集して権限を追加/削除：

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}
```

よく使うスコープ：
- `spreadsheets` — Google Sheetsの読み書き
- `userinfo.email` — ユーザーのメールアドレス取得
- `gmail.send` — メール送信
- `drive` — Google Driveアクセス
- `calendar` — Google Calendarアクセス

---

## 11. 注意点と制約

### GASの制限

| 制限 | 詳細 |
|------|------|
| 実行時間 | 1回の呼び出しで最大6分 |
| 日次クォータ | メール、URLフェッチ等に日次制限あり |
| WebSocketなし | `google.script.run`はリクエスト・レスポンスのみ |
| SSRなし | Reactはクライアント側のみで実行 |
| ペイロードサイズ | `google.script.run`で約50KB上限 |
| コールドスタート | 初回ロードが遅い場合あり（約2〜5秒） |

### ルーティング

**HashRouter**（`/#/path`）を使用すること。BrowserRouterは使えない。GASはHTML5 History APIをサポートしない — すべてのURLが同じ`doGet()`エンドポイントにヒットする。HashRouterならルーティングがクライアント側で完結する。

### 開発サーバーなし

`localhost`の開発サーバーはない。テストにはGASへのプッシュが必須：

```
編集 → pnpm run push → ブラウザリフレッシュ
```

UI変更のみの高速イテレーションには、モックデータを使ったローカルVite開発サーバーで一時的にコンポーネントをレンダリングできるが、フル統合テストには常にGASが必要。

### ビルド出力のテンプレートリテラル

GASの`HtmlService`は埋め込みJavaScript内のバッククォートで壊れることがある。ビルドパイプラインはBabelを使ってテンプレートリテラルを文字列連結に変換する。レンダリングエラーが出たら、ビルド出力に残ったバッククォートがないか確認すること。

### `<base target="_top">`タグ

`index.html`には`<base target="_top">`が含まれている。GASはアプリをiframe内で配信するため、このタグが必要。これがないと、リンクがフルページではなくiframe内でナビゲートしてしまう。

---

## まとめ

| 観点 | 生のHTML | 生のGAS | このテンプレート |
|------|---------|---------|----------------|
| データベース | なし / LocalStorage | Google Sheets | Google Sheets |
| ホスティング | 手動 | Google（無料） | Google（無料） |
| UIフレームワーク | なし | なし | React + Tailwind |
| 型安全性 | なし | なし | TypeScript |
| モジュール | なし | なし | 完全対応（esbuild） |
| AI親和性 | 低い（モノリシック） | 低い（グローバルスコープ） | 高い（モジュラー） |
| デプロイ | 手動 | clasp push | 1コマンド |
| スケーラビリティ | なし | 限定的 | コンポーネントベース |

**結論：** AIの支援でアプリを構築するなら、AIに**扱える構造**を与えよう。このテンプレートはその構造を提供する — 明確なファイル境界、予測可能なパターン、型安全性、そしてGASのすべての癖を処理するビルドパイプライン。AIがより良いコードを書き、ミスが減り、開発がより速くなる。
