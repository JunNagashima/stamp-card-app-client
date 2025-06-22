import { X } from "lucide-react";
import React from "react";
import type { Category } from "@/types/Mission";

interface MissionAddFormProps {
  categories: Category[];
  addNewMission: () => void;
  setNewMissionTitle: (title: string) => void;
  setNewMissionCategory: (category: string) => void;
  toggleAddForm: () => void;
  newMissionTitle: string;
  newMissionCategory?: string;
}
const MissionAddForm = ({
  categories,
  addNewMission,
  setNewMissionTitle,
  setNewMissionCategory,
  toggleAddForm,
  newMissionTitle,
  newMissionCategory
}: MissionAddFormProps) => {
  return (
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
  );
}

export default MissionAddForm;
