// ミッションの型定義
export interface Mission {
  id: string; // UUID
  title: string;
  category: Category;
  isCompleted?: boolean; // オプション: 完了状態
}

export interface Category {
  id: string; // UUID
  name: string;
  color: string;
}

// ミッション統計情報の型定義
export interface MissionStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  thisMonthDays: number;
}
