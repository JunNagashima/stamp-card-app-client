// ミッションの型定義
export interface Mission {
  id: number;
  title: string;
  completed: boolean;
  category: string;
}

export interface Category {
  id: number;
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
