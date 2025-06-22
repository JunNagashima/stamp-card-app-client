import { Category, Mission } from "@/types/Mission";

interface MissionCategoryProps {
  category: Category;
  dailyMissions: Mission[];
}

interface MissionCategoryStats {
  count: number;
  completed: number;
}

const MissionCategory = ({ dailyMissions, category }: MissionCategoryProps) => {
  const missionsByCategory: Record<string, MissionCategoryStats> = dailyMissions.reduce((acc, mission) => {
    if (!acc[mission.category.id]) {
      acc[mission.category.id] = { count: 0, completed: 0 };
    }
    acc[mission.category.id].count += 1;
    if (mission.isCompleted) {
      acc[mission.category.id].completed += 1;
    }
    return acc;
  }, {} as Record<string, MissionCategoryStats>);

  const count = missionsByCategory[category.id]?.count || 0;
  const completed = missionsByCategory[category.id]?.completed || 0;

  return (
    <div className={`flex items-center justify-between ${category.color} p-3 rounded-lg mb-2`}>
      <div className="flex items-center">
        <div className="font-medium">{category.name}</div>
      </div>
      <div className="text-sm">{completed}/{count} 完了</div>
    </div>
  );
}

export default MissionCategory;
