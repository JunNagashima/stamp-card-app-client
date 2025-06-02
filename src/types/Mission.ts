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
