'use client';
import {
  Settings, Calendar, Map, Award, Zap,
} from 'lucide-react';

const Sidebar = () => {
  // デスクトップのサイドバーコンテンツ
  const SidebarContent = () => (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white">
          <span className="text-xl font-bold">YT</span>
        </div>
        <div>
          <h2 className="font-bold text-lg">山田太郎</h2>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Zap className="w-4 h-4 text-yellow-500 mr-1" />
            <span>連続7日達成中！</span>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium">
          <Map className="w-5 h-5" />
          <span>今日のミッション</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700">
          <Calendar className="w-5 h-5" />
          <span>カレンダー</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700">
          <Award className="w-5 h-5" />
          <span>達成状況</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700">
          <Settings className="w-5 h-5" />
          <span>設定</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg text-gray-700">
          <LogOut className="w-5 h-5" />
          <span>ログアウト</span>
        </button>
      </nav>
    </>
  );

  // デスクトップ表示の場合はシンプルなコンテンツを返す
  if (isDesktop) {
    return <SidebarContent />;
  }

  // モバイル・タブレット表示の場合はスライドインサイドバーを返す
  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-40 z-40" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed inset-y-0 left-0 w-4/5 md:w-2/3 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}>
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">ミッションスタンプ</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
