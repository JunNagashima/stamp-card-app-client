'use client';

// test comment

import React, { useState } from 'react';
import {
  PlusCircle, Edit, Trash2, Star, Heart, Zap, Calendar,
  ArrowLeft, RefreshCw, Settings, Clock, Users, Package
} from 'lucide-react';
import Link from 'next/link';
import Default from '@/app/components/organisms/default';
import SidebarContent from '@/app/components/organisms/SideBarContent';
import {
  Category, Frequency, RegularMission, DailyMission, Mission, NewMission,
  defaultCategories, defaultFrequencies, formatFrequency,
  AddMissionModal, EditMissionModal
} from './_components/MissionModals';

const MissionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'regular' | 'daily'>('regular');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentMission, setCurrentMission] = useState<NewMission | null>(null);

  // 定期ミッション
  const [regularMissions, setRegularMissions] = useState<RegularMission[]>([
    {
      id: 'reg-1',
      originalId: 'reg-1',
      type: 'regular',
      title: '朝の散歩',
      description: '20分間の散歩をします',
      category: '健康',
      iconName: 'heart',
      icon: <Heart className="w-4 h-4 text-pink-500" />,
      priority: 1,
      hasTarget: true,
      targetType: 'duration',
      targetValue: 20,
      targetUnit: '分',
      frequency: 'daily',
      days: [0, 1, 2, 3, 4, 5, 6], // 毎日
      startDate: '2025-05-01',
      endDate: null,
      isActive: true,
      createdAt: '2025-05-01T10:00:00Z',
      updatedAt: '2025-05-01T10:00:00Z'
    },
    {
      id: 'reg-2',
      originalId: 'reg-2',
      type: 'regular',
      title: '英語の勉強',
      description: 'アプリで英単語を学習',
      category: '成長',
      iconName: 'zap',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      priority: 2,
      hasTarget: false,
      frequency: 'weekly',
      days: [1, 3, 5], // 月, 水, 金
      startDate: '2025-05-01',
      endDate: null,
      isActive: true,
      createdAt: '2025-05-01T10:00:00Z',
      updatedAt: '2025-05-01T10:00:00Z'
    },
    {
      id: 'reg-3',
      originalId: 'reg-3',
      type: 'regular',
      title: '読書',
      description: '本を読む時間を確保',
      category: '趣味',
      iconName: 'star',
      icon: <Star className="w-4 h-4 text-purple-500" />,
      priority: 2,
      hasTarget: true,
      targetType: 'duration',
      targetValue: 30,
      targetUnit: '分',
      frequency: 'daily',
      days: [0, 1, 2, 3, 4, 5, 6], // 毎日
      startDate: '2025-05-01',
      endDate: null,
      isActive: true,
      createdAt: '2025-05-01T10:00:00Z',
      updatedAt: '2025-05-01T10:00:00Z'
    }
  ]);

  // 単発ミッション
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>([
    {
      id: 'daily-1',
      originalId: 'daily-1',
      type: 'daily',
      title: '買い物に行く',
      description: '夕食の材料を購入',
      category: '日常',
      iconName: 'package',
      icon: <Package className="w-4 h-4 text-blue-500" />,
      priority: 1,
      hasTarget: false,
      date: '2025-05-17',
      isActive: true,
      createdAt: '2025-05-17T08:00:00Z',
      updatedAt: '2025-05-17T08:00:00Z'
    },
    {
      id: 'daily-2',
      originalId: 'daily-2',
      type: 'daily',
      title: '友人とランチ',
      description: '12時にカフェで待ち合わせ',
      category: '社交',
      iconName: 'users',
      icon: <Users className="w-4 h-4 text-green-500" />,
      priority: 2,
      hasTarget: false,
      date: '2025-05-18',
      isActive: true,
      createdAt: '2025-05-16T15:00:00Z',
      updatedAt: '2025-05-16T15:00:00Z'
    }
  ]);

  // カテゴリー一覧
  const categories: Category[] = defaultCategories;

  // 頻度一覧
  const frequencies: Frequency[] = defaultFrequencies;

  // ミッション追加モーダルを表示
  const openAddModal = (): void => {
    setCurrentMission({
      type: activeTab,
      title: '',
      description: '',
      category: '健康',
      priority: 2,
      hasTarget: false,
      targetType: 'duration',
      targetValue: 20,
      targetUnit: '分',
      frequency: 'daily',
      days: [0, 1, 2, 3, 4, 5, 6],
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(true);
  };

  // ミッション編集モーダルを表示
  const openEditModal = (mission: Mission): void => {
    setCurrentMission({ ...mission });
    setShowEditModal(true);
  };

  // 定期ミッションの削除
  const deleteRegularMission = (missionId: string): void => {
    if (confirm('このミッションを削除してもよろしいですか？')) {
      setRegularMissions(
        regularMissions.map(mission =>
          mission.id === missionId ? { ...mission, isActive: false } : mission
        )
      );
    }
  };

  // 単発ミッションの削除
  const deleteDailyMission = (missionId: string): void => {
    if (confirm('このミッションを削除してもよろしいですか？')) {
      setDailyMissions(
        dailyMissions.map(mission =>
          mission.id === missionId ? { ...mission, isActive: false } : mission
        )
      );
    }
  };

  // ミッション追加フォーム送信
  const handleAddMissionSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!currentMission) return;

    const now = new Date().toISOString();
    const newId = `${currentMission.type}-${Date.now()}`;

    const categoryObj = categories.find(cat => cat.name === currentMission.category);
    const iconElement = categoryObj ? categoryObj.icon : <Star className="w-4 h-4 text-purple-500" />;

    if (currentMission.type === 'regular') {
      const newMission: RegularMission = {
        ...currentMission as Omit<RegularMission, 'id' | 'originalId' | 'iconName' | 'icon' | 'isActive' | 'createdAt' | 'updatedAt'>,
        id: newId,
        originalId: newId,
        iconName: categoryObj?.iconName || 'star',
        icon: iconElement,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        type: 'regular',
        frequency: currentMission.frequency || 'daily',
        days: currentMission.days || [0, 1, 2, 3, 4, 5, 6],
        startDate: currentMission.startDate || now.split('T')[0],
        endDate: currentMission.endDate || null
      };
      setRegularMissions([...regularMissions, newMission]);
    } else {
      const newMission: DailyMission = {
        ...currentMission as Omit<DailyMission, 'id' | 'originalId' | 'iconName' | 'icon' | 'isActive' | 'createdAt' | 'updatedAt'>,
        id: newId,
        originalId: newId,
        iconName: categoryObj?.iconName || 'star',
        icon: iconElement,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        type: 'daily',
        date: currentMission.date || now.split('T')[0]
      };
      setDailyMissions([...dailyMissions, newMission]);
    }

    setShowAddModal(false);
  };

  // ミッション編集フォーム送信
  const handleEditMissionSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!currentMission) return;

    const now = new Date().toISOString();
    const newId = `${currentMission.type}-${Date.now()}`;

    const categoryObj = categories.find(cat => cat.name === currentMission.category);
    const iconElement = categoryObj ? categoryObj.icon : <Star className="w-4 h-4 text-purple-500" />;

    // 旧ミッションを非アクティブにする
    if (currentMission.type === 'regular') {
      setRegularMissions(
        regularMissions.map(mission =>
          mission.id === currentMission.id ? { ...mission, isActive: false, updatedAt: now } : mission
        )
      );

      // 新しいミッションを追加
      const newMission: RegularMission = {
        ...currentMission as Omit<RegularMission, 'iconName' | 'icon' | 'isActive' | 'createdAt' | 'updatedAt'>,
        id: newId,
        originalId: currentMission.originalId || currentMission.id || newId,
        iconName: categoryObj?.iconName || 'star',
        icon: iconElement,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        type: 'regular',
        frequency: currentMission.frequency || 'daily',
        days: currentMission.days || [0, 1, 2, 3, 4, 5, 6],
        startDate: currentMission.startDate || now.split('T')[0],
        endDate: currentMission.endDate || null
      };

      setRegularMissions([...regularMissions, newMission]);
    } else {
      setDailyMissions(
        dailyMissions.map(mission =>
          mission.id === currentMission.id ? { ...mission, isActive: false, updatedAt: now } : mission
        )
      );

      // 新しいミッションを追加
      const newMission: DailyMission = {
        ...currentMission as Omit<DailyMission, 'iconName' | 'icon' | 'isActive' | 'createdAt' | 'updatedAt'>,
        id: newId,
        originalId: currentMission.originalId || currentMission.id || newId,
        iconName: categoryObj?.iconName || 'star',
        icon: iconElement,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        type: 'daily',
        date: currentMission.date || now.split('T')[0]
      };

      setDailyMissions([...dailyMissions, newMission]);
    }

    setShowEditModal(false);
  };

  // 曜日選択のトグル
  const toggleDaySelection = (day: number): void => {
    if (!currentMission) return;

    const days = currentMission.days || [];
    if (days.includes(day)) {
      setCurrentMission({
        ...currentMission,
        days: days.filter((d: number) => d !== day)
      });
    } else {
      setCurrentMission({
        ...currentMission,
        days: [...days, day].sort((a, b) => a - b)
      });
    }
  };

  // 入力フィールド変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    if (!currentMission) return;

    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (type === 'checkbox' && checked !== undefined) {
      setCurrentMission({ ...currentMission, [name]: checked });
    } else {
      setCurrentMission({ ...currentMission, [name]: value });
    }
  };

  // 数値入力フィールド変更ハンドラ
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!currentMission) return;

    const { name, value } = e.target;
    const numberValue = value === '' ? undefined : parseInt(value, 10);
    setCurrentMission({ ...currentMission, [name]: numberValue });
  };

  return (
    <Default>
      {/* 左サイドバー - デスクトップのみ表示 */}
      <div className="col-span-1 hidden lg:block">
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <SidebarContent />
        </div>

        {/* ミッションカテゴリー */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <h2 className="font-bold mb-3 text-lg">カテゴリー</h2>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center justify-between ${category.color} p-3 rounded-lg mb-2`}
            >
              <div className="flex items-center">
                <div className="mr-2">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
              </div>
              <div className="text-sm">
                {activeTab === 'regular'
                  ? `${regularMissions.filter(m => m.isActive && m.category === category.name).length} ミッション`
                  : `${dailyMissions.filter(m => m.isActive && m.category === category.name).length} ミッション`
                }
              </div>
            </div>
          ))}
        </div>

        {/* 統計情報 */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h2 className="font-bold mb-4 text-lg">ステータス</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">定期ミッション数</span>
              <span className="font-medium">{regularMissions.filter(m => m.isActive).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">単発ミッション数</span>
              <span className="font-medium">{dailyMissions.filter(m => m.isActive).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">合計ミッション数</span>
              <span className="font-medium">
                {regularMissions.filter(m => m.isActive).length + dailyMissions.filter(m => m.isActive).length}
              </span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">最終更新</span>
              <span className="text-sm text-gray-500">
                {(() => {
                  const allMissions = [...regularMissions, ...dailyMissions].filter(m => m.isActive);
                  if (allMissions.length === 0) return '更新なし';
                  const latestMission = allMissions.sort((a, b) =>
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                  )[0];
                  return new Date(latestMission.updatedAt).toLocaleDateString('ja-JP');
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 中央コンテンツ：ミッション管理 */}
      <div className="col-span-1 lg:col-span-2">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-500" />
              ミッション管理
            </h1>
            <Link href="/" className="text-blue-500 flex items-center hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-1" />
              戻る
            </Link>
          </div>

          {/* タブ切り替え */}
          <div className="flex border-b mb-4">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'regular' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('regular')}
            >
              <div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-1" />
                定期ミッション
              </div>
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'daily' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('daily')}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                単発ミッション
              </div>
            </button>
          </div>

          {/* 新規ミッション追加ボタン */}
          <button
            className="w-full mb-6 py-3 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            onClick={openAddModal}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            <span>{activeTab === 'regular' ? '定期ミッションを追加' : '単発ミッションを追加'}</span>
          </button>

          {/* ミッション一覧 */}
          <div className="space-y-3">
            {activeTab === 'regular' ? (
              regularMissions.filter(m => m.isActive).length > 0 ? (
                regularMissions.filter(m => m.isActive).map(mission => (
                  <div
                    key={mission.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center">
                        {mission.icon}
                        <h3 className="ml-2 font-medium">{mission.title}</h3>
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full">
                          {formatFrequency(mission)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <span className="mr-3">{mission.category}</span>
                        {mission.hasTarget && mission.targetValue && mission.targetUnit && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {mission.targetValue}{mission.targetUnit}
                          </span>
                        )}
                      </div>
                      {mission.description && (
                        <p className="text-xs text-gray-600 mt-1">{mission.description}</p>
                      )}
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => openEditModal(mission)}
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-full"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRegularMission(mission.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>定期ミッションはまだありません</p>
                  <button
                    onClick={openAddModal}
                    className="mt-2 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    定期ミッションを追加する
                  </button>
                </div>
              )
            ) : (
              dailyMissions.filter(m => m.isActive).length > 0 ? (
                dailyMissions.filter(m => m.isActive).map(mission => (
                  <div
                    key={mission.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center">
                        {mission.icon}
                        <h3 className="ml-2 font-medium">{mission.title}</h3>
                        <span className="ml-2 text-xs bg-green-100 text-green-700 py-0.5 px-2 rounded-full">
                          {new Date(mission.date).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span>{mission.category}</span>
                      </div>
                      {mission.description && (
                        <p className="text-xs text-gray-600 mt-1">{mission.description}</p>
                      )}
                    </div>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => openEditModal(mission)}
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-full"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDailyMission(mission.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>単発ミッションはまだありません</p>
                  <button
                    onClick={openAddModal}
                    className="mt-2 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    単発ミッションを追加する
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* モーダル */}
      {showAddModal && currentMission && (
        <AddMissionModal
          activeTab={activeTab}
          currentMission={currentMission}
          categories={categories}
          frequencies={frequencies}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddMissionSubmit}
          onInputChange={handleInputChange}
          onNumberInputChange={handleNumberInputChange}
          toggleDaySelection={toggleDaySelection}
        />
      )}

      {showEditModal && currentMission && (
        <EditMissionModal
          currentMission={currentMission}
          categories={categories}
          frequencies={frequencies}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditMissionSubmit}
          onInputChange={handleInputChange}
          onNumberInputChange={handleNumberInputChange}
          toggleDaySelection={toggleDaySelection}
        />
      )}
    </Default>
  );
};

export default MissionManagement;
