import { Mission } from "@/types/Mission";

interface MissionCategoryProps {
  category: string;
  dailyMissions: Mission[];
  color: string;
}

interface MissionCategoryStats {
  count: number;
  completed: number;
}

const MissionCategory = ({ dailyMissions, category, color }: MissionCategoryProps) => {
  const missionsByCategory: Record<string, MissionCategoryStats> = dailyMissions.reduce((acc, mission) => {
    if (!acc[mission.category]) {
      acc[mission.category] = { count: 0, completed: 0 };
    }
    acc[mission.category].count += 1;
    if (mission.completed) {
      acc[mission.category].completed += 1;
    }
    return acc;
  }, {} as Record<string, MissionCategoryStats>);

  const count = missionsByCategory[category]?.count || 0;
  const completed = missionsByCategory[category]?.completed || 0;

  return (
    <div className={`flex items-center justify-between ${color} p-3 rounded-lg mb-2`}>
      <div className="flex items-center">
        <div className="font-medium">{category}</div>
      </div>
      <div className="text-sm">{completed}/{count} 完了</div>
    </div>
  );
}

export default MissionCategory;
