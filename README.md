# Taskal - タスク・スケジュール管理アプリ

タスク管理とスケジュール管理をシームレスに行えるWebアプリケーション。
Googleカレンダー連携により、タスクを予定として自動的に同期できます。

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router), shadcn/ui, Tailwind CSS
- **バックエンド**: Supabase (PostgreSQL, Auth)
- **リンター/フォーマッター**: Biome
- **アーキテクチャ**: FSD (Feature-Sliced Design)
- **ホスティング**: Vercel
- **外部API**: Google Calendar API

## プロジェクト構造

```
taskal/
├── app/                 # Next.js App Router
├── src/
│   ├── components/ui/  # shadcn/ui コンポーネント
│   ├── lib/            # ユーティリティ、Supabaseクライアント
│   ├── types/          # TypeScript型定義
│   ├── entities/       # ビジネスエンティティ (task, user等)
│   ├── features/       # 機能単位のコード
│   └── widgets/        # 複合UIコンポーネント
├── supabase/
│   └── migrations/     # データベースマイグレーション
└── public/             # 静的ファイル
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Calendar API
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. データベースのセットアップ

Supabaseプロジェクトで以下のマイグレーションを実行してください：

```bash
# Supabase CLIを使用する場合
supabase db push

# または、Supabaseダッシュボードから
# supabase/migrations/20250220000000_initial_schema.sql を実行
```

### 4. Supabase AuthでGoogle OAuth設定

1. Supabaseダッシュボード → Authentication → Providers
2. Google Providerを有効化
3. Google Cloud Consoleで取得したClient IDとClient Secretを設定
4. Google Calendar API のスコープを追加

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## スクリプト

```bash
npm run dev        # 開発サーバーの起動
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバーの起動
npm run lint       # Biomeでコードチェック
npm run lint:fix   # Biomeで自動修正
npm run format     # コードフォーマット
```

## 機能

- **タスク管理**: タスクの作成、編集、削除、一覧表示
- **ステータス管理**: 未着手、進行中、完了
- **優先度設定**: 高、中、低
- **カレンダービュー**: タスクをカレンダー形式で表示
- **Googleカレンダー連携**: タスクをGoogleカレンダーに同期
- **ゲスト管理**: 予定に他のユーザーを招待

## データベース設計

詳細は `init.md` を参照してください。

主なテーブル：
- `tasks` - タスク情報
- `guest_contacts` - ゲスト連絡先
- `task_guests` - タスクとゲストの中間テーブル
