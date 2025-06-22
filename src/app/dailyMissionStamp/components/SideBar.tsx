'use client';

import SidebarContent from '@/app/components/organisms/SideBarContent';
import MissionCategory from '@/app/dailyMissionStamp/components/MissionCategory';
import StatsCard from '@/app/dailyMissionStamp/components/StatsCard';
import { Category, Mission, MissionStats } from '@/types/Mission';

interface SideBarProps {
  categories: Category[];
  dailyMissions: Mission[];
  stats: MissionStats;
}

const SideBar = ({ categories, dailyMissions, stats }: SideBarProps) => {
  return (
    <div className="col-span-1 hidden lg:block">
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <SidebarContent />
      </div>

      {/* ミッションカテゴリー */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <h2 className="font-bold mb-3 text-lg">カテゴリー</h2>
        {categories.map((category) => (
          <MissionCategory
            key={category.id}
            dailyMissions={dailyMissions}
            category={category}
          />
        ))}
      </div>

      {/* 統計情報 */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h2 className="font-bold mb-4 text-lg">達成状況</h2>
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            title="現在の連続記録"
            value={stats.currentStreak + "日"}
          />
          <StatsCard
            title="最長記録"
            value={stats.longestStreak + "日"}
          />
          <StatsCard
            title="今月の達成"
            value={stats.thisMonthDays + "日"}
          />
          <StatsCard
            title="完了率"
            value={stats.completionRate + "%"}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
