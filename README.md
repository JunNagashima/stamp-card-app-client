# デイリーミッションスタンプアプリ 概要説明

このアプリは、日々の習慣やタスクを **「ミッション」** として管理し、達成状況を記録・可視化する習慣化支援アプリです。健康・成長・趣味など、継続したい活動をミッションに設定し、毎日の達成を後押しします。

---

## 主な機能

### 1. 今日のミッション管理
- カテゴリ別（健康 / 成長 / 趣味 など）に今日のミッションを一覧表示
- ミッションの **完了・未完了** 状態をワンタップで切替
- ミッションの **追加・編集・削除**
- その日のミッションをすべて達成すると **スタンプ** を獲得

### 2. カレンダー機能
- **月間 / 週間** 表示の切替
- 達成日にスタンプを表示する **カレンダービュー**
- 日付を選択すると、その日のミッション詳細を確認
- 期間ごとのミッション達成状況を **統計グラフ** で可視化

### 3. 達成状況分析
- **現在の連続達成日数** と **最長記録** をリアルタイム表示
- **カテゴリ別達成率** を円グラフや棒グラフで表示
- **週間・月間・年間** 単位での統計情報
- 条件達成で **アチーブメント（称号）** を獲得

### 4. 設定
- プロフィール情報の編集
- 通知設定（メール / プッシュ通知 / リマインダー）
- 表示設定（ライト / ダークテーマ・言語設定）
- プライバシー設定（プロフィール公開範囲・統計情報共有）

---

## ユーザーインターフェース

- **レスポンシブデザイン**：モバイル・タブレット・デスクトップ対応
- グラデーションを用いた **モダンなUI**
- サイドバーやタブを使った **直感的ナビゲーション**
- スタンプカレンダーや統計グラフで **視覚的フィードバック**

---

## 技術スタック

| 分類 | 採用技術 |
|------|----------|
| フレームワーク | Next.js (React) |
| スタイリング | Tailwind CSS |
| アイコン | Lucide React |
| クライアントステート管理 | React Hooks（`useState`, `useEffect`） |

---

## ユーザー体験のポイント

- **スタンプ・グラフ・アチーブメント** による視覚的な達成感
- 連続記録の表示で **モチベーションを維持**
- カテゴリ分けで **多様な習慣づけ** をサポート
- すべてのデバイスで **一貫した操作性**

---

## 想定ユーザー

- 日々の習慣を確立したい人
- 自己啓発や成長を **記録・可視化** したい人
- 健康習慣を **継続的に維持** したい人
- 目標達成のためのタスク管理を **効率化** したい人

---

## DB設計

### ■ Supabase Auth 利用
- 通常の `users` テーブルは不要
- 各テーブルの `user_id` カラムに Supabase Auth が発行した UUID を格納
- 必要に応じて `auth.users` ビューに対する FK 制約を設定可能

---

### 1. `categories` テーブル

| カラム名     | 型                    | 制約                          | 説明                       |
|--------------|-----------------------|-------------------------------|----------------------------|
| id           | UUID                  | PK, DEFAULT gen_random_uuid() | カテゴリID                 |
| user_id      | UUID                  | NOT NULL                      | Supabase Auth のユーザーID |
| name         | VARCHAR(50)           | NOT NULL                      | カテゴリ名                 |
| color_code   | VARCHAR(7)            | NOT NULL                      | カラーコード（#RRGGBB）    |
| created_at   | TIMESTAMP WITH TZ     | NOT NULL, DEFAULT now()       | 作成日時                   |

- インデックス：`(user_id, name)`（ユーザー内の重複防止にユニーク制約も可）

---

### 2. `missions` テーブル

| カラム名         | 型                    | 制約                                                              | 説明                                                         |
|------------------|-----------------------|-------------------------------------------------------------------|--------------------------------------------------------------|
| id               | UUID                  | PK, DEFAULT gen_random_uuid()                                     | ミッションID                                                 |
| user_id          | UUID                  | NOT NULL                                                          | Supabase Auth のユーザーID                                   |
| category_id      | UUID                  | NOT NULL, FK → categories(id)                                     | 所属カテゴリ                                                 |
| title            | VARCHAR(200)          | NOT NULL                                                          | ミッション名                                                 |
| description      | TEXT                  |                                                                   | 詳細説明                                                     |
| is_active        | BOOLEAN               | NOT NULL, DEFAULT true                                            | 有効／無効                                                   |
| type             | VARCHAR(20)           | NOT NULL, DEFAULT 'recurring'                                     | 種別：`recurring`（定期）／`one_time`（単発）                |
| recurrence_rule  | VARCHAR(100)          | NULL                                                              | 定期頻度（例：`DAILY`, `WEEKLY`, `MONTHLY`）                |
| start_date       | DATE                  | NULL                                                              | 定期ミッションの開始日                                       |
| end_date         | DATE                  | NULL                                                              | 定期ミッションの終了日                                       |
| one_time_date    | DATE                  | NULL                                                              | 単発ミッションの日付                                         |
| created_at       | TIMESTAMP WITH TZ     | NOT NULL, DEFAULT now()                                           | 作成日時                                                     |
| updated_at       | TIMESTAMP WITH TZ     | NOT NULL, DEFAULT now()                                           | 更新日時                                                     |

- **チェック制約**：
  ```sql
  CHECK (
    (type = 'recurring'
      AND recurrence_rule IS NOT NULL
      AND start_date IS NOT NULL
      AND one_time_date IS NULL)
    OR
    (type = 'one_time'
      AND one_time_date IS NOT NULL
      AND recurrence_rule IS NULL
      AND start_date IS NULL
      AND end_date IS NULL)
  )
  ```

- **インデックス**：
  - `(user_id, is_active, type)`
  - `(user_id, one_time_date)`
  - `(user_id, recurrence_rule, start_date)`

### 3. `mission_instances` テーブル

| カラム名       | 型                    | 制約                                        | 説明                         |
|----------------|-----------------------|---------------------------------------------|------------------------------|
| id             | UUID                  | PK, DEFAULT gen_random_uuid()               | 実績ID                       |
| user_id        | UUID                  | NOT NULL                                    | Supabase Auth のユーザーID   |
| mission_id     | UUID                  | NOT NULL, FK → missions(id)                 | 対象ミッション               |
| target_date    | DATE                  | NOT NULL                                    | 対象日                       |
| is_completed   | BOOLEAN               | NOT NULL, DEFAULT false                     | 完了フラグ                   |
| completed_at   | TIMESTAMP WITH TZ     | NULL                                        | 完了日時（未完了時は NULL）   |

- **ユニーク制約**：`(user_id, mission_id, target_date)`
- **インデックス**：`(user_id, target_date)`

---

### 4. `stamps` テーブル

| カラム名     | 型                    | 制約                          | 説明                       |
|--------------|-----------------------|-------------------------------|----------------------------|
| id           | UUID                  | PK, DEFAULT gen_random_uuid() | スタンプID                 |
| user_id      | UUID                  | NOT NULL                      | Supabase Auth のユーザーID |
| earned_date  | DATE                  | NOT NULL, UNIQUE              | 獲得日                     |
| earned_at    | TIMESTAMP WITH TZ     | NOT NULL, DEFAULT now()       | 獲得日時                   |

- **インデックス**：`(user_id)`

---

### 5. `achievements` テーブル

| カラム名       | 型                    | 制約                          | 説明                       |
|----------------|-----------------------|-------------------------------|----------------------------|
| id             | UUID                  | PK, DEFAULT gen_random_uuid() | アチーブID                 |
| user_id        | UUID                  | NOT NULL                      | Supabase Auth のユーザーID |
| type           | VARCHAR(100)          | NOT NULL                      | 種類                       |
| parameters     | JSONB                 |                               | パラメータ                 |
| achieved_date  | DATE                  | NOT NULL                      | 獲得日                     |

- **インデックス**：`(user_id, type)`

---

### 6. `user_settings` テーブル

| カラム名      | 型                    | 制約                          | 説明                       |
|---------------|-----------------------|-------------------------------|----------------------------|
| user_id       | UUID                  | PK                            | Supabase Auth のユーザーID |
| notify_email  | BOOLEAN               | NOT NULL, DEFAULT true        | メール通知                 |
| notify_push   | BOOLEAN               | NOT NULL, DEFAULT true        | プッシュ通知               |
| theme         | VARCHAR(10)           | NOT NULL, DEFAULT 'light'     | テーマ                     |
| language      | VARCHAR(5)            | NOT NULL, DEFAULT 'ja'        | 言語設定                   |
| share_profile | BOOLEAN               | NOT NULL, DEFAULT false       | プロフィール公開           |
| share_stats   | BOOLEAN               | NOT NULL, DEFAULT false       | 統計情報共有               |
