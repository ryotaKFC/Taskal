# Taskal - Claude Code ガイド

## プロジェクト概要

タスク管理とスケジュール管理をシームレスに行えるWebアプリケーション。
Googleカレンダー連携により、タスクを予定として同期できる。

- **フロントエンド**: Next.js (App Router), shadcn/ui, Tailwind CSS v4
- **バックエンド**: Supabase (PostgreSQL, Auth)
- **リンター/フォーマッター**: Biome
- **アーキテクチャ**: FSD (Feature-Sliced Design)

## ドキュメント

| ドキュメント | 説明 |
| --- | --- |
| [docs/spec.md](./docs/spec.md) | 要件定義・仕様書 |
| [docs/coding-conventions.md](./docs/coding-conventions.md) | コーディング規約 |
| [docs/migration.md](./docs/migration.md) | DBマイグレーション手順 |

## よく使うコマンド

```bash
npm run dev        # 開発サーバーの起動 (http://localhost:3000)
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバーの起動
npm run lint       # Biomeでコードチェック
npm run lint:fix   # Biomeで自動修正
npm run format     # コードフォーマット
```

## 重要なルール

- TypeScript strict モードを使用
- FSD アーキテクチャに従う（上位層から下位層への import のみ）
- ファイル名は kebab-case
- UI は shadcn/ui を基本とする
- 詳細は [docs/coding-conventions.md](./docs/coding-conventions.md) を参照
