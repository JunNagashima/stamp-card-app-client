const AchievementsPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Achievements Page</h1>
    </div>
  );
}

export default AchievementsPage;
// 'use client'

// import React, { useState, useEffect } from 'react';
// import {
//   User, Settings, Calendar, Map, Search, Bell, Award,
//   ChevronLeft, ChevronRight, CheckCircle, ArrowUp,
//   Heart, Star, Zap, Info, Menu, X, BarChart,
//   Clock, TrendingUp, PieChart
// } from 'lucide-react';
// import SidebarContent from '@/_components/organisms/SideBarContent';

// const AchievementsPage = () => {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(1440);

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

//   // サンプルデータ
//   const stats = {
//     currentStreak: 7,
//     longestStreak: 14,
//     completionRate: 81,
//     monthlyDays: {
//       completed: 23,
//       total: 30
//     },
//     categoryRates: {
//       "健康": 85,
//       "成長": 92,
//       "趣味": 67
//     }
//   };

//   // タブコンポーネント
//   const TabSelector = () => (
//     <div className="border-b border-gray-200 mb-4">
//       <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
//         <li className="mr-2">
//           <button
//             onClick={() => setActiveTab('summary')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'summary'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             概要
//           </button>
//         </li>
//         <li className="mr-2">
//           <button
//             onClick={() => setActiveTab('categories')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'categories'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             カテゴリー
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => setActiveTab('achievements')}
//             className={`inline-block p-4 rounded-t-lg ${activeTab === 'achievements'
//               ? 'border-b-2 border-blue-600 text-blue-600'
//               : 'border-transparent hover:text-gray-600 hover:border-gray-300'
//               }`}
//           >
//             アチーブメント
//           </button>
//         </li>
//       </ul>
//     </div>
//   );

//   // メインコンテンツ
//   const StatsCard = ({ title, value, icon }) => (
//     <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-gray-500 text-sm">{title}</h3>
//         {icon}
//       </div>
//       <p className="text-2xl font-bold">{value}</p>
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
//             <div className="bg-white rounded-xl p-4 shadow-md mb-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                 <h2 className="text-xl font-bold">達成状況</h2>
//                 <div className="inline-flex rounded-md shadow-sm" role="group">
//                   <button className="px-4 py-2 text-sm font-medium rounded-l-lg bg-blue-600 text-white border border-gray-200">
//                     週間
//                   </button>
//                   <button className="px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-r border-gray-200">
//                     月間
//                   </button>
//                   <button className="px-4 py-2 text-sm font-medium rounded-r-lg bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">
//                     年間
//                   </button>
//                 </div>
//               </div>

//               <TabSelector />

//               {activeTab === 'summary' && (
//                 <div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                     <StatsCard
//                       title="現在の連続達成"
//                       value={`${stats.currentStreak}日`}
//                       icon={<Clock className="w-5 h-5 text-blue-500" />}
//                     />
//                     <StatsCard
//                       title="最長連続記録"
//                       value={`${stats.longestStreak}日`}
//                       icon={<Award className="w-5 h-5 text-purple-500" />}
//                     />
//                     <StatsCard
//                       title="全期間完了率"
//                       value={`${stats.completionRate}%`}
//                       icon={<CheckCircle className="w-5 h-5 text-green-500" />}
//                     />
//                     <StatsCard
//                       title="今月の達成日数"
//                       value={`${stats.monthlyDays.completed}/${stats.monthlyDays.total}日`}
//                       icon={<Calendar className="w-5 h-5 text-indigo-500" />}
//                     />
//                   </div>

//                   {/* カテゴリー別グラフ（簡易表示） */}
//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-bold text-lg">カテゴリー別の達成率</h3>
//                       <BarChart className="w-5 h-5 text-gray-500" />
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="flex items-center">
//                             <Heart className="w-4 h-4 text-pink-500 mr-2" />
//                             <span className="font-medium">健康</span>
//                           </div>
//                           <span className="text-sm font-bold">{stats.categoryRates["健康"]}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-pink-500 h-2 rounded-full"
//                             style={{ width: `${stats.categoryRates["健康"]}%` }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="flex items-center">
//                             <Zap className="w-4 h-4 text-yellow-500 mr-2" />
//                             <span className="font-medium">成長</span>
//                           </div>
//                           <span className="text-sm font-bold">{stats.categoryRates["成長"]}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-yellow-500 h-2 rounded-full"
//                             style={{ width: `${stats.categoryRates["成長"]}%` }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="flex items-center">
//                             <Star className="w-4 h-4 text-purple-500 mr-2" />
//                             <span className="font-medium">趣味</span>
//                           </div>
//                           <span className="text-sm font-bold">{stats.categoryRates["趣味"]}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-purple-500 h-2 rounded-full"
//                             style={{ width: `${stats.categoryRates["趣味"]}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'categories' && (
//                 <div>
//                   {/* カテゴリー別詳細 */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                     <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-pink-500">
//                       <div className="flex items-center mb-3">
//                         <Heart className="w-6 h-6 text-pink-500 mr-2" />
//                         <h3 className="font-bold text-lg">健康</h3>
//                       </div>
//                       <div className="mb-2">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>完了率</span>
//                           <span className="font-bold">{stats.categoryRates["健康"]}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${stats.categoryRates["健康"]}%` }}></div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
//                       <div className="flex items-center mb-3">
//                         <Zap className="w-6 h-6 text-yellow-500 mr-2" />
//                         <h3 className="font-bold text-lg">成長</h3>
//                       </div>
//                       <div className="mb-2">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>完了率</span>
//                           <span className="font-bold">{stats.categoryRates["成長"]}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${stats.categoryRates["成長"]}%` }}></div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
//                       <div className="flex items-center mb-3">
//                         <Star className="w-6 h-6 text-purple-500 mr-2" />
//                         <h3 className="font-bold text-lg">趣味</h3>
//                       </div>
//                       <div className="mb-2">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>完了率</span>
//                           <span className="font-bold">{stats.categoryRates["趣味"]}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${stats.categoryRates["趣味"]}%` }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'achievements' && (
//                 <div className="space-y-4">
//                   <h3 className="font-bold text-lg mb-2">獲得したアチーブメント</h3>

//                   <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-start">
//                     <div className="p-2 bg-blue-100 rounded-full mr-4">
//                       <Award className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-bold">7日連続達成</h4>
//                       <div className="text-sm text-gray-500">2025年5月7日に獲得</div>
//                       <p className="text-sm mt-1">7日間連続でミッションを達成</p>
//                     </div>
//                   </div>

//                   <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-start">
//                     <div className="p-2 bg-pink-100 rounded-full mr-4">
//                       <Heart className="w-6 h-6 text-pink-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-bold">健康マスター</h4>
//                       <div className="text-sm text-gray-500">2025年4月30日に獲得</div>
//                       <p className="text-sm mt-1">健康カテゴリのミッションを50回達成</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AchievementsPage;
