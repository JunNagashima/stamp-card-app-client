'use client';

import React, { useState, ReactElement, SVGProps } from 'react';
import {
  Map, PlusCircle, Star, Heart, Zap, Shield, X,
} from 'lucide-react';
import Default from '@/app/components/organisms/default';
import SidebarContent from '@/app/components/organisms/SideBarContent';
import Calendar from '@/app/components/organisms/Calendar';
import { useDate } from '@/hooks/date';
import MissionItem from '@/app/dailyMissionStamp/components/MissionItem';
import type { Mission } from "@/types/Mission";
import { useMission } from "@/hooks/mission";
// カテゴリーの型定義
interface Category {
  id: number;
  name: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>
  color: string;
}

// ミッションカテゴリー統計情報の型定義
// interface MissionCategoryStats {
//   count: number;
//   completed: number;
//   icon: React.ReactElement;
// }

// ミッション統計情報の型定義
// interface MissionStats {
//   currentStreak: number;
//   longestStreak: number;
//   completionRate: number;
//   thisMonthDays: number;
// }

// 月間達成状況の型定義
interface MonthlyAchievements {
  [date: string]: boolean;
}

// MissionCategoryコンポーネントのProps型定義
// interface MissionCategoryProps {
//   category: string;
//   count: number;
//   completed: number;
//   color: string;
//   icon: React.ReactElement;
// }

// StatsCardコンポーネントのProps型定義
// interface StatsCardProps {
//   title: string;
//   value: string;
//   icon: React.ReactElement;
// }

const DailyMissionStampApp: React.FC = () => {
  const {
    todayString,
    setSelectedDate,
  } = useDate();
  const { dailyMissions, setDailyMissions } = useMission();

  // ミッション追加用の状態
  const [newMissionTitle, setNewMissionTitle] = useState<string>('');
  const [newMissionCategory, setNewMissionCategory] = useState<string>('健康');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

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

  // カテゴリー一覧とそれに対応するアイコン
  const categories: Category[] = [
    { id: 1, name: "健康", icon: <Heart className="w-4 h-4 text-pink-500" />, color: "bg-pink-100" },
    { id: 2, name: "成長", icon: <Zap className="w-4 h-4 text-yellow-500" />, color: "bg-yellow-100" },
    { id: 3, name: "趣味", icon: <Star className="w-4 h-4 text-purple-500" />, color: "bg-purple-100" }
  ];

  // ミッション追加フォームの表示/非表示切り替え
  const toggleAddForm = (): void => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setNewMissionTitle('');
      setNewMissionCategory('健康');
    }
  };

  // 新しいミッションの追加
  const addNewMission = (): void => {
    if (newMissionTitle.trim() === '') return;

    const categoryObj = categories.find(cat => cat.name === newMissionCategory);
    if (!categoryObj) return;

    const newMission: Mission = {
      id: Date.now(), // 一意のIDとして現在のタイムスタンプを使用
      title: newMissionTitle,
      completed: false,
      category: newMissionCategory
    };

    setDailyMissions([...dailyMissions, newMission]);
    setNewMissionTitle('');
    setShowAddForm(false);
  };

  // ミッション名の編集開始


  // 全てのミッションが完了しているか確認
  const allMissionsCompleted = dailyMissions.every(mission => mission.completed);

  // 統計データ
  // const stats: MissionStats = {
  //   currentStreak: 7,
  //   longestStreak: 14,
  //   completionRate: 85,
  //   thisMonthDays: 9 // 今月の達成日数
  // };


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

  // MissionCategory コンポーネント
  // const MissionCategory: React.FC<MissionCategoryProps> = ({ category, count, completed, color, icon }) => (
  //   <div className={`flex items-center justify-between ${color} p-3 rounded-lg mb-2`}>
  //     <div className="flex items-center">
  //       <div className="mr-2">{icon}</div>
  //       <div className="font-medium">{category}</div>
  //     </div>
  //     <div className="text-sm">{completed}/{count} 完了</div>
  //   </div>
  // );

  // StatsCard コンポーネント
  // const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => (
  //   <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
  //     <div>
  //       <p className="text-sm text-gray-500">{title}</p>
  //       <p className="text-xl font-bold">{value}</p>
  //     </div>
  //     <div className="bg-blue-100 p-2 rounded-full">
  //       {icon}
  //     </div>
  //   </div>
  // );

  // カテゴリー別にミッションをグループ化
  // const missionsByCategory: Record<string, MissionCategoryStats> = dailyMissions.reduce((acc, mission) => {
  //   if (!acc[mission.category]) {
  //     acc[mission.category] = { count: 0, completed: 0, icon: mission.icon };
  //   }
  //   acc[mission.category].count += 1;
  //   if (mission.completed) {
  //     acc[mission.category].completed += 1;
  //   }
  //   return acc;
  // }, {} as Record<string, MissionCategoryStats>);

  // 日付がクリックされたときの処理
  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    // ここに選択された日付に基づく処理を追加
  };

  return (
    <Default>
      {/* 左サイドバー - デスクトップのみ表示 */}
      <div className="col-span-1 hidden lg:block">
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <SidebarContent />
        </div>

        {/* ミッションカテゴリー */}
        {/* <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <h2 className="font-bold mb-3 text-lg">カテゴリー</h2>
          {categories.map((category) => (
            <MissionCategory
              key={category.id}
              category={category.name}
              count={missionsByCategory[category.name]?.count || 0}
              completed={missionsByCategory[category.name]?.completed || 0}
              color={category.color}
              icon={category.icon}
            />
          ))}
        </div> */}

        {/* 統計情報 */}
        {/* <div className="bg-white rounded-xl p-4 shadow-md">
          <h2 className="font-bold mb-4 text-lg">達成状況</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatsCard
              title="現在の連続記録"
              value={stats.currentStreak + "日"}
              icon={<Zap className="w-5 h-5 text-blue-500" />}
            />
            <StatsCard
              title="最長記録"
              value={stats.longestStreak + "日"}
              icon={<Award className="w-5 h-5 text-blue-500" />}
            />
            <StatsCard
              title="今月の達成"
              value={stats.thisMonthDays + "日"}
              icon={<CalendarIcon className="w-5 h-5 text-blue-500" />}
            />
            <StatsCard
              title="完了率"
              value={stats.completionRate + "%"}
              icon={<CheckCircle className="w-5 h-5 text-blue-500" />}
            />
          </div>
        </div> */}
      </div>

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
            <div className="mb-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-blue-800">今日のミッションを追加</h3>
                <button
                  onClick={toggleAddForm}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={newMissionTitle}
                  onChange={(e) => setNewMissionTitle(e.target.value)}
                  placeholder="ミッション名を入力"
                  className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && addNewMission()}
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-3 py-1 rounded-full text-xs flex items-center ${newMissionCategory === category.name
                        ? 'bg-blue-500 text-white'
                        : category.color + ' text-gray-700'
                        }`}
                      onClick={() => setNewMissionCategory(category.name)}
                    >
                      {React.cloneElement(category.icon, {
                        className: `w-3 h-3 mr-1 ${newMissionCategory === category.name ? 'text-white' : ''}`
                      })}
                      {category.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={addNewMission}
                    disabled={newMissionTitle.trim() === ''}
                    className={`px-4 py-2 rounded-lg ${newMissionTitle.trim() === ''
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      }`}
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-5 border border-blue-100">
            <div className="flex justify-between items-center mb-4 flex-wrap">
              <h3 className="font-bold text-base md:text-lg flex items-center mb-2 md:mb-0">
                <Shield className="w-5 h-5 mr-2 text-blue-500" />
                今日の進捗
              </h3>
              <div className="bg-white rounded-full px-3 py-1 font-medium text-sm border border-blue-100">
                {dailyMissions.filter(m => m.completed).length}/{dailyMissions.length}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: dailyMissions.length > 0 ? `${(dailyMissions.filter(m => m.completed).length / dailyMissions.length) * 100}%` : '0%' }}
              ></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
              <p className="text-sm text-gray-600">
                {dailyMissions.length === 0 ? (
                  'ミッションを追加してスタートしましょう！'
                ) : allMissionsCompleted ? (
                  '今日のミッションをコンプリートしました！'
                ) : (
                  `あと${dailyMissions.length - dailyMissions.filter(m => m.completed).length}個のミッションでコンプリートです！`
                )}
              </p>
              <button
                onClick={markTodayAsComplete}
                disabled={monthlyAchievements[todayString] || dailyMissions.length === 0}
                className={`px-4 py-2 rounded-lg font-medium w-full md:w-auto ${monthlyAchievements[todayString] || dailyMissions.length === 0
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  }`}
              >
                {monthlyAchievements[todayString]
                  ? '今日は達成済み'
                  : '今日のスタンプを押す'}
              </button>
            </div>
          </div>
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
