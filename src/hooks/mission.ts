import type { Mission } from "@/types/Mission";
import { useState } from "react"

export const useMission = () => {
  // 日々のミッション
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([
    { id: 1, title: "朝の散歩 (20分)", completed: true, category: "健康" },
    { id: 2, title: "英語の勉強", completed: true, category: "成長" },
    { id: 3, title: "読書 (30分)", completed: false, category: "趣味" },
    { id: 4, title: "瞑想", completed: true, category: "健康" },
    { id: 5, title: "水を2リットル飲む", completed: false, category: "健康" }
  ]);

  // 編集中のミッションID
  const [editingMissionId, setEditingMissionId] = useState<number | null>(null);

  return {
    dailyMissions,
    setDailyMissions,
    editingMissionId,
    setEditingMissionId,
  }
}
