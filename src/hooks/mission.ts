'use client';

import type { Mission } from "@/types/Mission";
import { useState } from "react"
import type { Category } from "@/types/Mission";

export const useMission = () => {
  // 日々のミッション
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([]);

  // カテゴリー一覧とそれに対応するアイコン
  const categories: Category[] = [
    { id: '1', name: "健康", color: "bg-pink-100" },
    { id: '2', name: "成長", color: "bg-yellow-100" },
    { id: '3', name: "趣味", color: "bg-purple-100" }
  ];

  // 編集中のミッションID
  const [editingMissionId, setEditingMissionId] = useState<string | undefined>(undefined);
  // ミッション追加用の状態
  const [newMissionTitle, setNewMissionTitle] = useState<string>('');
  const [newMissionCategory, setNewMissionCategory] = useState<string | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // ミッション追加フォームの表示/非表示切り替え
  const toggleAddForm = (): void => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setNewMissionTitle('');
      setNewMissionCategory(undefined);
    }
  };

  // 新しいミッションの追加
  const addNewMission = (): void => {
    if (newMissionTitle.trim() === '') return;

    const categoryObj = categories.find(cat => cat.name === newMissionCategory);
    if (!categoryObj) return;

    const newMission: Mission = {
      id: `kari-${Date.now()}`, // 仮のID生成
      // userId: 'user-123', // 仮のユーザーID
      title: newMissionTitle,
      category: categoryObj
    };
    console.log('mission.ts - Adding new mission:', newMission);
    setDailyMissions(prevMissions => {
      const updated = [...prevMissions, newMission];
      console.log('mission.ts - Updated missions:', updated);
      return updated;
    });
    setNewMissionTitle('');
    setShowAddForm(false);
  };

  return {
    dailyMissions,
    setDailyMissions,
    editingMissionId,
    setEditingMissionId,
    showAddForm,
    setShowAddForm,
    newMissionTitle,
    setNewMissionTitle,
    newMissionCategory,
    setNewMissionCategory,
    addNewMission,
    toggleAddForm,
    categories
  }
}
