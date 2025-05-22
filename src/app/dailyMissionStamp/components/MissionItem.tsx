import {
  CheckCircle, Edit, Trash2, Save
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMission } from '@/hooks/mission';
import type { Mission } from '@/types/Mission';

interface MissionItemProps {
  mission: Mission;
  dailyMissions: Mission[];
  setDailyMissions: React.Dispatch<React.SetStateAction<Mission[]>>;
}

const MissionItem = ({ mission, dailyMissions, setDailyMissions }: MissionItemProps) => {
  const { editingMissionId, setEditingMissionId } = useMission();
  // 編集中のミッション状態
  const [editMissionTitle, setEditMissionTitle] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // エディットモードのフォーカス管理
  useEffect(() => {
    if (editingMissionId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingMissionId]);

  const startEditingMission = (mission: Mission): void => {
    setEditingMissionId(mission.id);
    setEditMissionTitle(mission.title);
  };

  // ミッション名の変更を保存
  const saveEditedMission = (): void => {
    if (editMissionTitle.trim() === '') return;

    setDailyMissions(dailyMissions.map(mission =>
      mission.id === editingMissionId
        ? { ...mission, title: editMissionTitle }
        : mission
    ));

    setEditingMissionId(null);
    setEditMissionTitle('');
  };

  // エディットモードのキー操作
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      saveEditedMission();
    } else if (e.key === 'Escape') {
      setEditingMissionId(null);
      setEditMissionTitle('');
    }
  };

  // ミッション完了トグル
  const toggleMissionCompletion = (missionId: number): void => {
    console.log('toggleMissionCompletion', missionId);
    console.log('dailyMissions', dailyMissions);
    console.log('mission', mission);
    setDailyMissions(dailyMissions.map(mission =>
      mission.id === missionId ? { ...mission, completed: !mission.completed } : mission
    ));
  };

  // ミッション削除
  const deleteMission = (missionId: number): void => {
    setDailyMissions(dailyMissions.filter(mission => mission.id !== missionId));
  };

  return (
    <div
      key={mission.id}
      className={`flex items-center justify-between p-3 md:p-4 rounded-xl border ${mission.completed ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-200'
        } hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-center flex-grow">
        <button
          onClick={() => toggleMissionCompletion(mission.id)}
          className={`w-7 h-7 md:w-8 md:h-8 rounded-full mr-2 md:mr-3 flex items-center justify-center ${mission.completed
            ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
            : 'border-2 border-gray-300'
            }`}
        >
          {mission.completed && <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />}
        </button>
        <div className="flex-grow">
          <div className="flex items-center">
            {/* 編集モード時はインプットフィールドを表示 */}
            {editingMissionId === mission.id ? (
              <input
                // ref={editInputRef}
                type="text"
                value={editMissionTitle}
                onChange={(e) => setEditMissionTitle(e.target.value)}
                onBlur={saveEditedMission}
                onKeyDown={handleEditKeyDown}
                className="ml-2 p-1 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              />
            ) : (
              <p
                className={`font-medium ml-2 text-sm md:text-base ${mission.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => !mission.completed && startEditingMission(mission)}
              >
                {mission.title}
              </p>
            )}
          </div>
          <span className="text-xs text-gray-500">{mission.category}</span>
        </div>
      </div>

      <div className="flex items-center">
        {/* 編集モード時は保存ボタンを表示 */}
        {editingMissionId === mission.id ? (
          <button
            onClick={saveEditedMission}
            className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded-full mr-1"
          >
            <Save className="w-4 h-4" />
          </button>
        ) : (
          <>
            {/* 編集ボタン - 完了していない場合のみ表示 */}
            {!mission.completed && (
              <button
                onClick={() => startEditingMission(mission)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full mr-1"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {/* 削除ボタン */}
            <button
              onClick={() => deleteMission(mission.id)}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MissionItem;
