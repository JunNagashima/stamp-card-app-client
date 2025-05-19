import { useState } from 'react';

interface UseDate {
  todayString: string;
  currentMonth: number;
  currentYear: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  getDateString: (day: number | null) => string | null;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}
export const useDate = (): UseDate => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // 今日の日付の文字列表現
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 日付の文字列表現を取得（カレンダーコンポーネント用）
  const getDateString = (day: number | null): string | null => {
    if (!day) return null;
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // 前月に移動
  const goToPreviousMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 次月に移動
  const goToNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return {
    todayString,
    currentMonth,
    currentYear,
    selectedDate,
    setSelectedDate,
    getDateString,
    goToPreviousMonth,
    goToNextMonth,
  }
}
