'use client';
import {
  Settings, Calendar, Award, Zap,
  LogOut, ClipboardList, LayoutDashboard
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

// ナビゲーションメニューのアイテムの型定義
type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  action: () => void;
};

const SidebarContent = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 現在のパスがアクティブかどうかを判断する関数
  const isActive = (path: string): boolean => pathname === path;

  // ページ遷移のための関数
  const navigateTo = (path: string) => () => router.push(path);

  // ログアウト処理
  const handleLogout = () => {
    console.log('ログアウト処理');
    // ログアウト処理の実装
  };

  // ナビゲーションメニューの配列
  const navItems: NavItem[] = [
    {
      label: '今日のミッション',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dailyMissionStamp',
      action: navigateTo('/dailyMissionStamp')
    },
    {
      label: 'ミッション管理',
      icon: <ClipboardList className="w-5 h-5" />,
      path: '/mission',
      action: navigateTo('/mission')
    },
    {
      label: 'カレンダー',
      icon: <Calendar className="w-5 h-5" />,
      path: '/calendar',
      action: navigateTo('/calendar')
    },
    {
      label: '達成状況',
      icon: <Award className="w-5 h-5" />,
      path: '/achievement',
      action: navigateTo('/achievement')
    },
    {
      label: '設定',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
      action: navigateTo('/settings')
    },
    {
      label: 'ログアウト',
      icon: <LogOut className="w-5 h-5" />,
      path: '/logout',
      action: handleLogout
    },
  ];

  return (
    <>
      {/* ユーザープロフィール */}
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

      {/* ナビゲーションメニュー */}
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
              ${isActive(item.path)
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'hover:bg-blue-50 text-gray-700'}
            `}
          >
            <span className={isActive(item.path) ? 'text-white' : 'text-blue-500'}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default SidebarContent;
