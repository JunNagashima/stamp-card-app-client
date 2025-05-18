const SettingsPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Setting Page</h1>
    </div>
  )
}

export default SettingsPage;


// 'use client'

// import React, { useState, useEffect } from 'react';
// import {
//   User, Settings, Calendar, Map, Search, Bell, Award,
//   ChevronLeft, ChevronRight, CheckCircle, Save,
//   Heart, Star, Zap, Info, Menu, X, BarChart,
//   Clock, TrendingUp, PieChart, Mail, Lock,
//   BellRing, Moon, Sun, LogOut, Globe, Edit, Camera
// } from 'lucide-react';
// import SidebarContent from '@/_components/organisms/SideBarContent';

// const SettingsPage = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(1440);

//   // 設定の状態
//   const [settings, setSettings] = useState({
//     profile: {
//       name: "山田太郎",
//       email: "yamada@example.com",
//       image: null
//     },
//     notifications: {
//       email: true,
//       push: true,
//       reminders: true,
//       achievements: true
//     },
//     appearance: {
//       theme: "light",
//       language: "ja"
//     },
//     privacy: {
//       publicProfile: false,
//       shareStats: false
//     }
//   });

//   // 設定変更ハンドラ
//   const handleSettingChange = (category, setting, value) => {
//     setSettings(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [setting]: value
//       }
//     }));
//   };

//   // レスポンシブ設定
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(false);
//       }
//     };

//     setWindowWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const isTablet = windowWidth >= 768 && windowWidth < 1024;
//   const isDesktop = windowWidth >= 1024;

//   // タブコンポーネント
//   const TabSelector = () => (
//     <div className="border-b border-gray-200 mb-6">
//       <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
//         <li className="mr-2">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'profile'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             プロフィール
//           </button>
//         </li>
//         <li className="mr-2">
//           <button
//             onClick={() => setActiveTab('notifications')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'notifications'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             通知
//           </button>
//         </li>
//         <li className="mr-2">
//           <button
//             onClick={() => setActiveTab('appearance')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'appearance'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             表示設定
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => setActiveTab('privacy')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'privacy'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             プライバシー
//           </button>
//         </li>
//       </ul>
//     </div>
//   );

//   // プロフィールタブコンテンツ
//   const ProfileTab = () => (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white">
//             <span className="text-2xl font-bold">YT</span>
//           </div>
//           <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full shadow-md">
//             <Camera className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="text-center sm:text-left">
//           <h3 className="text-xl font-bold">{settings.profile.name}</h3>
//           <p className="text-gray-500">{settings.profile.email}</p>
//           <p className="mt-1 text-sm text-blue-500">2025年1月15日に登録</p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
//           <div className="flex">
//             <input
//               type="text"
//               value={settings.profile.name}
//               onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
//           <div className="flex">
//             <input
//               type="email"
//               value={settings.profile.email}
//               onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
//               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
//           <button className="flex items-center space-x-2 text-blue-600 font-medium">
//             <Lock className="w-4 h-4" />
//             <span>パスワードを変更する</span>
//           </button>
//         </div>

//         <div className="pt-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 font-medium">
//             <Save className="w-4 h-4" />
//             <span>変更を保存</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // 通知タブコンテンツ
//   const NotificationsTab = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <div className="flex justify-between items-center border-b pb-4">
//           <div>
//             <h3 className="font-medium">メール通知</h3>
//             <p className="text-sm text-gray-500">ミッションのリマインダーをメールで受け取る</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings.notifications.email}
//               onChange={() => handleSettingChange('notifications', 'email', !settings.notifications.email)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//           </label>
//         </div>

//         <div className="flex justify-between items-center border-b pb-4">
//           <div>
//             <h3 className="font-medium">プッシュ通知</h3>
//             <p className="text-sm text-gray-500">アプリからのプッシュ通知を受け取る</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings.notifications.push}
//               onChange={() => handleSettingChange('notifications', 'push', !settings.notifications.push)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//           </label>
//         </div>

//         <div className="flex justify-between items-center border-b pb-4">
//           <div>
//             <h3 className="font-medium">リマインダー</h3>
//             <p className="text-sm text-gray-500">未完了のミッションについてリマインドする</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings.notifications.reminders}
//               onChange={() => handleSettingChange('notifications', 'reminders', !settings.notifications.reminders)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//           </label>
//         </div>

//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="font-medium">アチーブメント通知</h3>
//             <p className="text-sm text-gray-500">新しいアチーブメントを獲得した際に通知</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings.notifications.achievements}
//               onChange={() => handleSettingChange('notifications', 'achievements', !settings.notifications.achievements)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//           </label>
//         </div>

//         <div className="pt-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 font-medium">
//             <Save className="w-4 h-4" />
//             <span>変更を保存</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // 表示設定タブコンテンツ
//   const AppearanceTab = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <div className="border-b pb-4">
//           <h3 className="font-medium mb-3">テーマ</h3>
//           <div className="flex space-x-4">
//             <label className={`flex flex-col items-center space-y-2 cursor-pointer ${settings.appearance.theme === 'light' ? 'text-blue-600' : 'text-gray-500'}`}>
//               <div className={`p-3 rounded-md ${settings.appearance.theme === 'light' ? 'bg-blue-100 ring-2 ring-blue-600' : 'bg-gray-100'}`}>
//                 <Sun className="w-6 h-6" />
//               </div>
//               <input
//                 type="radio"
//                 name="theme"
//                 value="light"
//                 checked={settings.appearance.theme === 'light'}
//                 onChange={() => handleSettingChange('appearance', 'theme', 'light')}
//                 className="sr-only"
//               />
//               <span className="text-sm">ライト</span>
//             </label>

//             <label className={`flex flex-col items-center space-y-2 cursor-pointer ${settings.appearance.theme === 'dark' ? 'text-blue-600' : 'text-gray-500'}`}>
//               <div className={`p-3 rounded-md ${settings.appearance.theme === 'dark' ? 'bg-blue-100 ring-2 ring-blue-600' : 'bg-gray-100'}`}>
//                 <Moon className="w-6 h-6" />
//               </div>
//               <input
//                 type="radio"
//                 name="theme"
//                 value="dark"
//                 checked={settings.appearance.theme === 'dark'}
//                 onChange={() => handleSettingChange('appearance', 'theme', 'dark')}
//                 className="sr-only"
//               />
//               <span className="text-sm">ダーク</span>
//             </label>

//             <label className={`flex flex-col items-center space-y-2 cursor-pointer ${settings.appearance.theme === 'system' ? 'text-blue-600' : 'text-gray-500'}`}>
//               <div className={`p-3 rounded-md ${settings.appearance.theme === 'system' ? 'bg-blue-100 ring-2 ring-blue-600' : 'bg-gray-100'}`}>
//                 <Settings className="w-6 h-6" />
//               </div>
//               <input
//                 type="radio"
//                 name="theme"
//                 value="system"
//                 checked={settings.appearance.theme === 'system'}
//                 onChange={() => handleSettingChange('appearance', 'theme', 'system')}
//                 className="sr-only"
//               />
//               <span className="text-sm">システム設定</span>
//             </label>
//           </div>
//         </div>

//         <div className="pt-4">
//           <h3 className="font-medium mb-3">言語</h3>
//           <select
//             value={settings.appearance.language}
//             onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
//             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//           >
//             <option value="ja">日本語</option>
//             <option value="en">English</option>
//             <option value="zh">中文</option>
//             <option value="ko">한국어</option>
//           </select>
//         </div>

//         <div className="pt-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 font-medium">
//             <Save className="w-4 h-4" />
//             <span>変更を保存</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // プライバシータブコンテンツ
//   const PrivacyTab = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <div className="flex justify-between items-center border-b pb-4">
//           <div>
//             <h3 className="font-medium">プロフィールを公開</h3>
//             <p className="text-sm text-gray-500">他のユーザーがあなたのプロフィールを見ることができます</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings.privacy.publicProfile}
//               onChange={() => handleSettingChange('privacy', 'publicProfile', !settings.privacy.publicProfile)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//           </label>
//         </div>

//         <div className="flex justify-between items-center border-b pb-4">
//           <div>
//             <h3 className="font-medium">達成状況を共有</h3>
//             <p className="text-sm text-gray-500">あなたの統計情報を他のユーザーと共有します</p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={settings.privacy.shareStats}
//               onChange={() => handleSettingChange('privacy', 'shareStats', !settings.privacy.shareStats)}
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//           </label>
//         </div>

//         <div className="pt-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 font-medium">
//             <Save className="w-4 h-4" />
//             <span>変更を保存</span>
//           </button>
//         </div>

//         <div className="pt-4 border-t mt-6">
//           <h3 className="font-medium text-gray-900 mb-4">アカウント管理</h3>
//           <div className="space-y-3">
//             <button className="text-gray-700 flex items-center space-x-2">
//               <span>データのエクスポート</span>
//             </button>
//             <button className="text-red-600 flex items-center space-x-2">
//               <span>アカウントを削除</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* ヘッダー */}
//       <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg p-4 sticky top-0 z-30">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <div className="flex items-center">
//             {(isMobile || isTablet) && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="mr-3 p-2 rounded-full hover:bg-white/10"
//               >
//                 <Menu className="w-6 h-6 text-white" />
//               </button>
//             )}
//             <h1 className="text-xl md:text-2xl font-bold">ミッションスタンプ</h1>
//           </div>
//           <div className="flex items-center space-x-2 md:space-x-4">
//             <button className="p-2 rounded-full hover:bg-white/10 relative">
//               <Bell className="w-5 h-5 text-white" />
//               <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-300 rounded-full"></span>
//             </button>
//             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//               <User className="w-5 h-5 text-white" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* モバイルサイドバー */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setSidebarOpen(false)} />
//       )}
//       {(isMobile || isTablet) && (
//         <div className={`fixed inset-y-0 left-0 w-4/5 md:w-2/3 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           } overflow-y-auto`}>
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-bold">メニュー</h2>
//             <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="p-4">
//             <SidebarContent />
//           </div>
//         </div>
//       )}

//       {/* メインコンテンツ */}
//       <main className="max-w-6xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* 左サイドバー - デスクトップ */}
//           {isDesktop && (
//             <div className="col-span-1">
//               <div className="bg-white rounded-xl p-4 shadow-md mb-6">
//                 <SidebarContent />
//               </div>
//             </div>
//           )}

//           {/* メインコンテンツエリア */}
//           <div className="col-span-1 lg:col-span-2">
//             <div className="bg-white rounded-xl p-4 md:p-6 shadow-md mb-6">
//               <div className="mb-6">
//                 <h2 className="text-xl font-bold">設定</h2>
//                 <p className="text-gray-500">アカウントや利用環境を設定します</p>
//               </div>

//               <TabSelector />

//               {activeTab === 'profile' && <ProfileTab />}
//               {activeTab === 'notifications' && <NotificationsTab />}
//               {activeTab === 'appearance' && <AppearanceTab />}
//               {activeTab === 'privacy' && <PrivacyTab />}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SettingsPage;
