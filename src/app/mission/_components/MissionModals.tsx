import React, { ReactElement, SVGProps } from 'react';
import {
  X, Calendar, Clock, Star, Heart, Zap, Package, Users
} from 'lucide-react';

// アイコン名の型定義
export type IconName = 'heart' | 'zap' | 'star' | 'package' | 'users' | 'shield' | 'award' | 'check-circle';

// カテゴリーの型定義
export interface Category {
  id: number;
  name: string;
  iconName: IconName;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  color: string;
}

// 頻度の型定義
export interface Frequency {
  id: string;
  name: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
}

// ミッションの基本的な型定義
export interface BaseMission {
  id: string;
  originalId: string;
  type: 'regular' | 'daily';
  title: string;
  description: string;
  category: string;
  iconName: IconName;
  icon: React.ReactElement;
  priority: number;
  hasTarget: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  targetType?: 'duration' | 'count' | 'distance';
  targetValue?: number;
  targetUnit?: string;
}

// 定期ミッションの型定義
export interface RegularMission extends BaseMission {
  type: 'regular';
  frequency: string;
  days: number[];
  startDate: string;
  endDate: string | null;
}

// 単発ミッションの型定義
export interface DailyMission extends BaseMission {
  type: 'daily';
  date: string;
}

// ミッション型
export type Mission = RegularMission | DailyMission;

// 新規作成時のミッション型
export interface NewMission {
  id?: string;
  originalId?: string;
  type: 'regular' | 'daily';
  title: string;
  description: string;
  category: string;
  priority: number;
  hasTarget: boolean;
  targetType?: 'duration' | 'count' | 'distance';
  targetValue?: number;
  targetUnit?: string;
  frequency?: string;
  days?: number[];
  startDate?: string;
  endDate?: string | null;
  date?: string;
  iconName?: IconName;
  icon?: React.ReactElement;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// カテゴリー一覧のデフォルト値
export const defaultCategories: Category[] = [
  { id: 1, name: '健康', iconName: 'heart', icon: <Heart className="w-4 h-4 text-pink-500" />, color: 'bg-pink-100' },
  { id: 2, name: '成長', iconName: 'zap', icon: <Zap className="w-4 h-4 text-yellow-500" />, color: 'bg-yellow-100' },
  { id: 3, name: '趣味', iconName: 'star', icon: <Star className="w-4 h-4 text-purple-500" />, color: 'bg-purple-100' },
  { id: 4, name: '日常', iconName: 'package', icon: <Package className="w-4 h-4 text-blue-500" />, color: 'bg-blue-100' },
  { id: 5, name: '社交', iconName: 'users', icon: <Users className="w-4 h-4 text-green-500" />, color: 'bg-green-100' }
];

// 頻度一覧のデフォルト値
export const defaultFrequencies: Frequency[] = [
  { id: 'daily', name: '毎日', icon: <Calendar className="w-4 h-4" /> },
  { id: 'weekly', name: '毎週', icon: <Clock className="w-4 h-4" /> },
  { id: 'monthly', name: '毎月', icon: <Calendar className="w-4 h-4" /> }
];

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

// 基本モーダルコンポーネント
export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-5 w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface AddMissionModalProps {
  activeTab: 'regular' | 'daily';
  currentMission: NewMission;
  categories: Category[];
  frequencies: Frequency[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDaySelection: (day: number) => void;
}

// ミッション追加モーダルコンポーネント
export const AddMissionModal: React.FC<AddMissionModalProps> = ({
  activeTab,
  currentMission,
  categories,
  frequencies,
  onClose,
  onSubmit,
  onInputChange,
  onNumberInputChange,
  toggleDaySelection
}) => {
  return (
    <Modal title={activeTab === 'regular' ? '定期ミッション追加' : '単発ミッション追加'} onClose={onClose}>
      <form onSubmit={onSubmit}>
        {/* 基本情報 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">タイトル <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={currentMission.title}
            onChange={onInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">説明</label>
          <textarea
            name="description"
            value={currentMission.description}
            onChange={onInputChange}
            className="w-full p-2 border rounded-lg h-20"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">カテゴリー</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                className={`px-3 py-1 rounded-full text-xs flex items-center ${currentMission.category === category.name
                    ? 'bg-blue-500 text-white'
                    : category.color + ' text-gray-700'
                  }`}
                onClick={() => onInputChange({
                  target: { name: 'category', value: category.name }
                } as React.ChangeEvent<HTMLInputElement>)}
              >
                {React.cloneElement(category.icon, {
                  className: `w-3 h-3 mr-1 ${currentMission.category === category.name ? 'text-white' : ''}`
                })}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 定期ミッション設定 */}
        {activeTab === 'regular' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">繰り返し頻度</label>
            <div className="flex mb-3 border rounded-lg overflow-hidden">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  type="button"
                  className={`flex-1 py-2 text-center ${currentMission.frequency === freq.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700'
                    }`}
                  onClick={() => onInputChange({
                    target: { name: 'frequency', value: freq.id }
                  } as React.ChangeEvent<HTMLInputElement>)}
                >
                  <div className="flex items-center justify-center">
                    {React.cloneElement(freq.icon, {
                      className: `w-4 h-4 mr-1 ${currentMission.frequency === freq.id ? 'text-white' : 'text-gray-500'}`
                    })}
                    <span>{freq.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* 週次選択時の曜日選択 */}
            {currentMission.frequency === 'weekly' && (
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">繰り返す曜日</label>
                <div className="flex justify-between">
                  {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${currentMission.days?.includes(index)
                          ? 'bg-blue-500 text-white'
                          : 'border text-gray-700'
                        }`}
                      onClick={() => toggleDaySelection(index)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">開始日</label>
                <input
                  type="date"
                  name="startDate"
                  value={currentMission.startDate || ''}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">終了日（任意）</label>
                <input
                  type="date"
                  name="endDate"
                  value={currentMission.endDate || ''}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* 単発ミッション設定 */}
        {activeTab === 'daily' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">日付</label>
            <input
              type="date"
              name="date"
              value={currentMission.date || ''}
              onChange={onInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        )}

        {/* 数値目標設定 */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="hasTarget"
              name="hasTarget"
              checked={currentMission.hasTarget}
              onChange={onInputChange}
              className="mr-2"
            />
            <label htmlFor="hasTarget" className="text-sm font-medium">数値目標を設定</label>
          </div>

          {currentMission.hasTarget && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="targetValue"
                value={currentMission.targetValue || ''}
                onChange={onNumberInputChange}
                className="w-20 p-2 border rounded-lg"
                min="1"
              />
              <select
                name="targetUnit"
                value={currentMission.targetUnit || '分'}
                onChange={onInputChange}
                className="p-2 border rounded-lg"
              >
                <option value="分">分</option>
                <option value="回">回</option>
                <option value="km">km</option>
                <option value="L">L</option>
                <option value="ページ">ページ</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
            disabled={!currentMission.title.trim()}
          >
            追加
          </button>
        </div>
      </form>
    </Modal>
  );
};

interface EditMissionModalProps {
  currentMission: NewMission;
  categories: Category[];
  frequencies: Frequency[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onNumberInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDaySelection: (day: number) => void;
}

// ミッション編集モーダルコンポーネント
export const EditMissionModal: React.FC<EditMissionModalProps> = ({
  currentMission,
  categories,
  frequencies,
  onClose,
  onSubmit,
  onInputChange,
  onNumberInputChange,
  toggleDaySelection
}) => {
  return (
    <Modal title="ミッション編集" onClose={onClose}>
      <form onSubmit={onSubmit}>
        {/* 基本情報 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">タイトル <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={currentMission.title}
            onChange={onInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">説明</label>
          <textarea
            name="description"
            value={currentMission.description}
            onChange={onInputChange}
            className="w-full p-2 border rounded-lg h-20"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">カテゴリー</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                className={`px-3 py-1 rounded-full text-xs flex items-center ${currentMission.category === category.name
                    ? 'bg-blue-500 text-white'
                    : category.color + ' text-gray-700'
                  }`}
                onClick={() => onInputChange({
                  target: { name: 'category', value: category.name }
                } as React.ChangeEvent<HTMLInputElement>)}
              >
                {React.cloneElement(category.icon, {
                  className: `w-3 h-3 mr-1 ${currentMission.category === category.name ? 'text-white' : ''}`
                })}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 定期ミッション設定 */}
        {currentMission.type === 'regular' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">繰り返し頻度</label>
            <div className="flex mb-3 border rounded-lg overflow-hidden">
              {frequencies.map(freq => (
                <button
                  key={freq.id}
                  type="button"
                  className={`flex-1 py-2 text-center ${currentMission.frequency === freq.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700'
                    }`}
                  onClick={() => onInputChange({
                    target: { name: 'frequency', value: freq.id }
                  } as React.ChangeEvent<HTMLInputElement>)}
                >
                  <div className="flex items-center justify-center">
                    {React.cloneElement(freq.icon, {
                      className: `w-4 h-4 mr-1 ${currentMission.frequency === freq.id ? 'text-white' : 'text-gray-500'}`
                    })}
                    <span>{freq.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* 週次選択時の曜日選択 */}
            {currentMission.frequency === 'weekly' && (
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">繰り返す曜日</label>
                <div className="flex justify-between">
                  {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${currentMission.days?.includes(index)
                          ? 'bg-blue-500 text-white'
                          : 'border text-gray-700'
                        }`}
                      onClick={() => toggleDaySelection(index)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">開始日</label>
                <input
                  type="date"
                  name="startDate"
                  value={currentMission.startDate || ''}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">終了日（任意）</label>
                <input
                  type="date"
                  name="endDate"
                  value={currentMission.endDate || ''}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* 単発ミッション設定 */}
        {currentMission.type === 'daily' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">日付</label>
            <input
              type="date"
              name="date"
              value={currentMission.date || ''}
              onChange={onInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        )}

        {/* 数値目標設定 */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="editHasTarget"
              name="hasTarget"
              checked={currentMission.hasTarget}
              onChange={onInputChange}
              className="mr-2"
            />
            <label htmlFor="editHasTarget" className="text-sm font-medium">数値目標を設定</label>
          </div>

          {currentMission.hasTarget && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="targetValue"
                value={currentMission.targetValue || ''}
                onChange={onNumberInputChange}
                className="w-20 p-2 border rounded-lg"
                min="1"
              />
              <select
                name="targetUnit"
                value={currentMission.targetUnit || '分'}
                onChange={onInputChange}
                className="p-2 border rounded-lg"
              >
                <option value="分">分</option>
                <option value="回">回</option>
                <option value="km">km</option>
                <option value="L">L</option>
                <option value="ページ">ページ</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
            disabled={!currentMission.title.trim()}
          >
            保存
          </button>
        </div>
      </form>
    </Modal>
  );
};

// ミッション表示関連のユーティリティ関数

// 定期ミッションの頻度表示を整形
export const formatFrequency = (mission: RegularMission): string => {
  if (mission.frequency === 'daily') {
    return '毎日';
  } else if (mission.frequency === 'weekly') {
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    return '毎週 ' + mission.days.map(day => dayNames[day]).join('・');
  } else if (mission.frequency === 'monthly') {
    return '毎月';
  }
  return '';
};
