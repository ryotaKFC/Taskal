# コーディング規約

## 言語

TypeScript（strict モード）を使用する。

## リンター / フォーマッター

[Biome](https://biomejs.dev/) を使用する。

```bash
npm run lint       # コードチェック
npm run lint:fix   # 自動修正
npm run format     # フォーマット
```

## アーキテクチャ: FSD (Feature-Sliced Design)

### 層の構成

`processes` 層は使用しない。層の順序（上位 → 下位）:

```
app > pages > widgets > features > entities > shared
```

### import ルール

**上位層から下位層への import のみ許可。** 下位層から上位層への import は禁止。

```
app     → pages, widgets, features, entities, shared
pages   → widgets, features, entities, shared
widgets → features, entities, shared
features → entities, shared
entities → shared
shared  → (外部ライブラリのみ)
```

### segment 構成

各 slice は以下の segment で構成する（必要なものだけ作成）:

| segment | 役割 |
| --- | --- |
| `ui` | UIコンポーネント |
| `model` | 状態管理、ビジネスロジック |
| `api` | APIコール |
| `lib` | ユーティリティ、ヘルパー |
| `types` | 型定義 |

### ディレクトリ例

```
src/
├── app/                    # Next.js App Router
├── pages/                  # ページレベルのコンポーネント
├── widgets/                # 複合UIコンポーネント
├── features/               # 機能単位のコード
│   └── task-create/
│       ├── ui/
│       ├── model/
│       └── api/
├── entities/               # ビジネスエンティティ
│   └── task/
│       ├── ui/
│       ├── model/
│       └── types/
└── shared/                 # 共通コード
    ├── ui/                 # 汎用UIコンポーネント
    ├── lib/                # 汎用ユーティリティ
    └── api/                # APIクライアント
```

## UI

shadcn/ui を基本とする。コンポーネントは `src/components/ui/` に配置する。

## スタイリング

Tailwind CSS v4 を使用する。

## 命名規則

| 対象 | 規則 | 例 |
| --- | --- | --- |
| コンポーネント | PascalCase | `TaskCard`, `UserProfile` |
| 関数・変数 | camelCase | `getTaskList`, `userId` |
| ファイル | kebab-case | `task-card.tsx`, `use-tasks.ts` |
| 型・インターフェース | PascalCase | `Task`, `UserProfile` |
| 定数 | UPPER_SNAKE_CASE | `MAX_TASK_COUNT` |

コンポーネントファイルも kebab-case とする（例: `task-card.tsx`）。

## ファイル配置

Next.js App Router の規約に従う。

- ページ: `app/[route]/page.tsx`
- レイアウト: `app/[route]/layout.tsx`
- APIルート: `app/api/[route]/route.ts`
