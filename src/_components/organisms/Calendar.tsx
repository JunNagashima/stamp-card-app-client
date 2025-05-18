'use client';

import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

// 月間達成状況の型定義
interface MonthlyAchievements {
  [date: string]: boolean;
}

// カレンダーコンポーネントのProps型定義
interface CalendarProps {
  // 日付関連プロップス
  currentYear: number;
  currentMonth: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;

  // 表示関連プロップス
  showDetailLink?: boolean;
  onDateClick?: (date: Date) => void;

  // 達成状況データ
  monthlyAchievements?: MonthlyAchievements;

  // カスタマイズ
  customClassName?: string;

  // 日付文字列表現関数の外部化
  getDateString?: (day: number | null) => string | null;

  // オプション機能
  highlightToday?: boolean;
  todayString?: string;

  // 選択中の日付
  selectedDate?: Date;
}

/**
 * カレンダーコンポーネント
 * DailyMissionStampAppとCalendarPageの両方で使用される共通コンポーネント
 */
const Calendar: React.FC<CalendarProps> = ({
  // 日付関連プロップス
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,

  // 表示関連プロップス
  showDetailLink = false,
  onDateClick,

  // 達成状況データ
  monthlyAchievements = {},

  // カスタマイズ
  customClassName = "",

  // 日付文字列表現関数の外部化
  getDateString,

  // オプション機能
  highlightToday = true,
  todayString,

  // 選択中の日付
  selectedDate,
}) => {
  // 月の名前
  const monthNames: string[] = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  // カレンダーを生成する関数
  const generateCalendar = (year: number, month: number): (number | null)[] => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const calendar: (number | null)[] = [];

    // 週の初めの空白を埋める
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // 月の日数を埋める
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  // カレンダーの日付を取得
  const calendarDays = generateCalendar(currentYear, currentMonth);

  // 日付が選択された時の処理
  const handleDateClick = (day: number | null): void => {
    if (onDateClick && day) {
      const dateObj = new Date(currentYear, currentMonth, day);
      onDateClick(dateObj);
    }
  };

  // 内部でdateStringを取得する関数（外部から提供されない場合）
  const defaultGetDateString = (day: number | null): string | null => {
    if (!day) return null;
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // 実際に使用する関数を選択
  const getDateStringFn = getDateString || defaultGetDateString;

  // 選択された日付が現在の月に属しているか確認する関数
  const isDateSelected = (day: number | null): boolean => {
    if (!selectedDate || !day) return false;

    return selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === day;
  };

  return (
    <div className={`bg-white rounded-xl p-4 md:p-6 shadow-md ${customClassName}`}>
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl font-bold">{currentYear}年 {monthNames[currentMonth]}</h2>
        <div className="flex">
          <button onClick={onPrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
            &lt;
          </button>
          <button onClick={onNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
            &gt;
          </button>
        </div>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="font-medium text-gray-500 text-xs md:text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* カレンダー日付 */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {calendarDays.map((day, index) => {
          const dateStr = day ? getDateStringFn(day) : null;
          const isCompleted = dateStr && monthlyAchievements[dateStr];
          const isToday = dateStr === todayString && highlightToday;
          const isSelected = isDateSelected(day);

          return (
            <div key={index} className="aspect-square">
              {day && (
                <div
                  onClick={() => handleDateClick(day)}
                  className={`
                    w-full h-full flex flex-col items-center justify-center rounded-md md:rounded-xl
                    ${isToday ? 'border-2 border-blue-500' : ''}
                    ${isSelected ? 'bg-blue-50' : ''}
                    ${isCompleted ? 'bg-gradient-to-r from-blue-100 to-purple-100' : ''}
                    cursor-pointer hover:bg-gray-50 transition-colors
                  `}
                >
                  <span className={`text-xs md:text-sm ${isToday ? 'font-bold' : ''}`}>{day}</span>
                  {isCompleted && (
                    <div className="mt-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-0.5 md:p-1">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* モバイル・タブレットのみ表示：カレンダーへのリンク */}
      {showDetailLink && (
        <div className="mt-4 flex justify-end lg:hidden">
          <button className="flex items-center text-blue-500 font-medium text-sm">
            <span>カレンダー詳細</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
