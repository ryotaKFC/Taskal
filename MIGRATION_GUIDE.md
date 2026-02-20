# マイグレーション実行ガイド

## 方法1: Supabaseダッシュボード（推奨・簡単）

### ステップ1: SQLファイルの内容を確認
```bash
cat supabase/migrations/20250220000000_initial_schema.sql
```

### ステップ2: Supabaseダッシュボードで実行
1. https://supabase.com/dashboard にアクセス
2. プロジェクト選択
3. 左メニュー `SQL Editor` をクリック
4. `New query` をクリック
5. マイグレーションファイルの内容をコピー&ペースト
6. `Run` ボタンをクリック

### ステップ3: 確認
1. 左メニュー `Table Editor` を開く
2. 以下のテーブルが作成されていることを確認:
   - `tasks`
   - `guest_contacts`
   - `task_guests`

---

## 方法2: Supabase CLI（上級者向け）

### インストール
```bash
# npm でインストール
npm install -g supabase

# または Homebrew (Mac/Linux)
brew install supabase/tap/supabase

# または Scoop (Windows)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### ログイン
```bash
supabase login
```

### プロジェクトとリンク
```bash
# プロジェクトIDを確認 (ダッシュボードのURL から取得)
supabase link --project-ref your-project-id
```

### マイグレーション実行
```bash
# リモート（本番環境）に適用
supabase db push

# または、ローカル開発環境を起動して試す場合
supabase start
supabase db reset
```

### 確認
```bash
# テーブル一覧を確認
supabase db tables list
```

---

## トラブルシューティング

### エラー: `uuid-ossp` 拡張が見つからない
Supabaseでは通常有効になっていますが、エラーが出る場合:
```sql
-- SQL Editorで実行
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### エラー: テーブルが既に存在する
一度マイグレーションを実行している場合、再実行するとエラーになります。
その場合は、テーブルを削除してから再実行するか、マイグレーションファイルを修正してください。

### RLSポリシーの確認
```sql
-- SQL Editorで実行
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

---

## データベース構造の確認

### テーブル構造を確認
```sql
-- tasks テーブル
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'tasks';

-- guest_contacts テーブル
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'guest_contacts';

-- task_guests テーブル
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'task_guests';
```

### インデックスの確認
```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public';
```

---

## 次のステップ

マイグレーション実行後:
1. ✅ テーブルが作成された
2. ✅ RLSポリシーが有効になった
3. ✅ インデックスが作成された

これで開発を始められます！

```bash
npm run dev
```
