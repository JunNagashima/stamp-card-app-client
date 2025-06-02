'use client';

import React, { useEffect, useState } from 'react';
import {
  Map, PlusCircle
} from 'lucide-react';
import Default from '@/app/components/organisms/default';
import Calendar from '@/app/components/organisms/Calendar';
import { useDate } from '@/hooks/date';
import MissionItem from '@/app/dailyMissionStamp/components/MissionItem';
import { useMission } from "@/hooks/mission";
import MissionAddForm from '@/app/dailyMissionStamp/components/MissionAddForm';
import MissionStampProgress from '@/app/dailyMissionStamp/components/MissionStampProgress';
import SideBar from './components/SideBar';
import type { MissionStats } from '@/types/Mission';

// 月間達成状況の型定義
interface MonthlyAchievements {
  [date: string]: boolean;
}

const DailyMissionStampApp: React.FC = () => {
  const {
    todayString,
    setSelectedDate,
  } = useDate();
  const {
    dailyMissions,
    setDailyMissions,
    showAddForm,
    newMissionTitle,
    setNewMissionTitle,
    newMissionCategory,
    setNewMissionCategory,
    addNewMission,
    toggleAddForm,
    categories
  } = useMission();

  // 月間達成状況
  const [monthlyAchievements, setMonthlyAchievements] = useState<MonthlyAchievements>({
    "2025-05-01": true,
    "2025-05-02": true,
    "2025-05-03": true,
    "2025-05-04": true,
    "2025-05-05": true,
    "2025-05-06": true,
    "2025-05-07": true,
    "2025-05-08": false,
    "2025-05-09": false,
  });

  useEffect(() => {
    setDailyMissions([
      { id: 1, title: "朝の散歩 (20分)", completed: true, category: "健康" },
      { id: 2, title: "英語の勉強", completed: true, category: "成長" },
      { id: 3, title: "読書 (30分)", completed: false, category: "趣味" },
      { id: 4, title: "瞑想", completed: true, category: "健康" },
      { id: 5, title: "水を2リットル飲む", completed: false, category: "健康" }
    ])
  }, []);

  // 全てのミッションが完了しているか確認
  const allMissionsCompleted = dailyMissions.every(mission => mission.completed);

  // 統計データ
  const stats: MissionStats = {
    currentStreak: 7,
    longestStreak: 14,
    completionRate: 85,
    thisMonthDays: 9 // 今月の達成日数
  };

  // 今日のすべてのミッションを完了としてマーク
  const markTodayAsComplete = (): void => {
    // すべてのミッションを完了にする
    setDailyMissions(dailyMissions.map(mission => ({ ...mission, completed: true })));

    // 今日の日付を月間達成リストに追加
    setMonthlyAchievements({
      ...monthlyAchievements,
      [todayString]: true
    });
  };

  // 日付がクリックされたときの処理
  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    // ここに選択された日付に基づく処理を追加
  };

  return (
    <Default>
      {/* 左サイドバー - デスクトップのみ表示 */}
      <SideBar
        categories={categories}
        dailyMissions={dailyMissions}
        stats={stats}
      />

      {/* 中央コンテンツ：今日のミッション */}
      <div className="col-span-1 lg:col-span-2">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md mb-6">
          <div className="flex justify-between items-center mb-6 flex-wrap">
            <h2 className="text-xl font-bold flex items-center mb-2 md:mb-0">
              <Map className="w-6 h-6 mr-2 text-blue-500" />
              今日のミッション
            </h2>
            <div className="flex space-x-2">
              <button
                className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg"
                onClick={toggleAddForm}
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">ミッション追加</span>
              </button>
            </div>
          </div>

          {/* クイックミッション追加フォーム */}
          {showAddForm && (
            <MissionAddForm
              categories={categories}
              addNewMission={addNewMission}
              setNewMissionTitle={setNewMissionTitle}
              setNewMissionCategory={setNewMissionCategory}
              toggleAddForm={toggleAddForm}
              newMissionTitle={newMissionTitle}
              newMissionCategory={newMissionCategory}
            />
          )}

          {/* ミッションリスト */}
          <div className="space-y-3 mb-6">
            {dailyMissions.map(mission => (
              <MissionItem
                key={mission.id}
                mission={mission}
                dailyMissions={dailyMissions}
                setDailyMissions={setDailyMissions}
              />
            ))}

            {/* ミッションがない場合 */}
            {dailyMissions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>今日のミッションはまだありません</p>
                <button
                  onClick={toggleAddForm}
                  className="mt-2 text-blue-500 hover:text-blue-700 font-medium"
                >
                  ミッションを追加する
                </button>
              </div>
            )}
          </div>

          {/* 今日のスタンプカード進捗 */}
          <MissionStampProgress
            dailyMissions={dailyMissions}
            markTodayAsComplete={markTodayAsComplete}
            monthlyAchievements={monthlyAchievements}
            todayString={todayString}
            allMissionsCompleted={allMissionsCompleted}
          />
        </div>

        {/* 共通カレンダーコンポーネントを使用 */}
        <Calendar
          monthlyAchievements={monthlyAchievements}
          onDateClick={handleDateClick}
          showDetailLink={true}
        />
      </div>
    </Default>
  );
};

export default DailyMissionStampApp;
