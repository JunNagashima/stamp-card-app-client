import {
  Shield,
} from 'lucide-react';
import type { Mission } from '@/types/Mission';

interface MissionStampProgressProps {
  dailyMissions: Mission[];
  markTodayAsComplete: () => void;
  monthlyAchievements: string[];
  todayString: string;
  allMissionsCompleted: boolean;
}

const MissionStampProgress = ({
  dailyMissions,
  markTodayAsComplete,
  monthlyAchievements,
  todayString,
  allMissionsCompleted
}: MissionStampProgressProps) => {

  // monthlyAchievementsの中にtodayStringが含まれているかチェック
  const isTodayInDates = monthlyAchievements.includes(todayString);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-5 border border-blue-100">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h3 className="font-bold text-base md:text-lg flex items-center mb-2 md:mb-0">
          <Shield className="w-5 h-5 mr-2 text-blue-500" />
          今日の進捗
        </h3>
        <div className="bg-white rounded-full px-3 py-1 font-medium text-sm border border-blue-100">
          {dailyMissions.filter(m => m.isCompleted).length}/{dailyMissions.length}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: dailyMissions.length > 0 ? `${(dailyMissions.filter(m => m.isCompleted).length / dailyMissions.length) * 100}%` : '0%' }}
        ></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <p className="text-sm text-gray-600">
          {dailyMissions.length === 0 ? (
            'ミッションを追加してスタートしましょう！'
          ) : allMissionsCompleted ? (
            '今日のミッションをコンプリートしました！'
          ) : (
            `あと${dailyMissions.length - dailyMissions.filter(m => m.isCompleted).length}個のミッションでコンプリートです！`
          )}
        </p>
        <button
          onClick={markTodayAsComplete}
          disabled={isTodayInDates || dailyMissions.length === 0}
          className={`px-4 py-2 rounded-lg font-medium w-full md:w-auto ${isTodayInDates || dailyMissions.length === 0
            ? 'bg-gray-300 text-gray-500'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            }`}
        >
          {isTodayInDates
            ? '今日は達成済み'
            : '今日のスタンプを押す'}
        </button>
      </div>
    </div>
  );
}

export default MissionStampProgress;
