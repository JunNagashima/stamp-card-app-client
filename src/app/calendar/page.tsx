const CalendarPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Calendar Page</h1>
    </div>
  )
}

export default CalendarPage;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   User, Settings, Calendar as CalendarIcon, Map, Bell, Award,
//   ChevronLeft, ChevronRight, List, CheckCircle, Shield,
//   Heart, Star, Zap, Info, Menu, X
// } from 'lucide-react';
// import SidebarContent from '@/_components/organisms/SideBarContent';
// import Calendar from '@/_components/organisms/Calendar';

// const CalendarPage = () => {
//   // 状態管理
//   const today = new Date();
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [viewMode, setViewMode] = useState('month');
//   const [selectedDate, setSelectedDate] = useState(today);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(1440);

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

//   // データ
//   const monthlyAchievements = {
//     "2025-05-01": true,
//     "2025-05-02": true,
//     "2025-05-03": true,
//     "2025-05-04": true,
//     "2025-05-05": true,
//     "2025-05-06": false,
//     "2025-05-07": true,
//     "2025-05-08": false,
//     "2025-05-09": false,
//   };

//   const missionsData = {
//     "2025-05-01": [
//       { id: 1, title: "朝の散歩 (20分)", completed: true, category: "健康", icon: <Heart className="w-4 h-4 text-pink-500" /> },
//       { id: 2, title: "英語の勉強", completed: true, category: "成長", icon: <Zap className="w-4 h-4 text-yellow-500" /> },
//     ],
//     "2025-05-05": [
//       { id: 1, title: "朝の散歩 (20分)", completed: true, category: "健康", icon: <Heart className="w-4 h-4 text-pink-500" /> },
//       { id: 2, title: "英語の勉強", completed: true, category: "成長", icon: <Zap className="w-4 h-4 text-yellow-500" /> },
//       { id: 3, title: "読書 (30分)", completed: true, category: "趣味", icon: <Star className="w-4 h-4 text-purple-500" /> },
//     ],
//   };

//   // ヘルパー関数
//   const getDateString = (date) => {
//     if (!date) return null;
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // カレンダー用の形式の日付文字列取得（日付数値から）
//   const getCalendarDateString = (day) => {
//     if (!day) return null;
//     return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//   };

//   const weekDayNames = ['日', '月', '火', '水', '木', '金', '土'];

//   // ナビゲーション
//   const goToPreviousMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const goToNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   // 週表示用
//   const getWeekDays = (date) => {
//     const day = date.getDay();
//     const diff = date.getDate() - day;

//     const weekDays = [];
//     for (let i = 0; i < 7; i++) {
//       const newDate = new Date(date);
//       newDate.setDate(diff + i);
//       weekDays.push(newDate);
//     }
//     return weekDays;
//   };

//   const weekDays = getWeekDays(selectedDate);

//   const goToPreviousWeek = () => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(newDate.getDate() - 7);
//     setSelectedDate(newDate);
//   };

//   const goToNextWeek = () => {
//     const newDate = new Date(selectedDate);
//     newDate.setDate(newDate.getDate() + 7);
//     setSelectedDate(newDate);
//   };

//   // UI操作ハンドラー
//   const switchToWeekView = () => setViewMode('week');
//   const switchToMonthView = () => setViewMode('month');
//   const handleDateClick = (date) => setSelectedDate(date);

//   // 選択した日のミッション
//   const selectedDateStr = getDateString(selectedDate);
//   const selectedDateMissions = missionsData[selectedDateStr] || [];
//   const isSelectedDateCompleted = monthlyAchievements[selectedDateStr] || false;

//   // 今日の日付の文字列表現
//   const todayString = getDateString(today);

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

//               {/* 期間の統計情報 */}
//               <div className="bg-white rounded-xl p-4 shadow-md mb-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="font-bold text-lg">
//                     {viewMode === 'month'
//                       ? `${currentYear}年${currentMonth + 1}月の状況`
//                       : '今週の状況'}
//                   </h2>
//                   <div className="flex">
//                     <button
//                       onClick={switchToMonthView}
//                       className={`p-2 ${viewMode === 'month' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} rounded-l-lg`}
//                     >
//                       <CalendarIcon className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={switchToWeekView}
//                       className={`p-2 ${viewMode === 'week' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} rounded-r-lg`}
//                     >
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>達成日数</span>
//                     <span className="font-bold">7日</span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>ミッション総数</span>
//                     <span className="font-bold">32個</span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>完了ミッション</span>
//                     <span className="font-bold">26個</span>
//                   </div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>完了率</span>
//                     <span className="font-bold">81%</span>
//                   </div>
//                 </div>

//                 <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
//                   <div
//                     className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
//                     style={{ width: '81%' }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-gray-500 text-right">期間全体の達成率</p>
//               </div>
//             </div>
//           )}

//           {/* カレンダーコンテンツ */}
//           <div className="col-span-1 lg:col-span-2">
//             {/* モバイル/タブレット用の期間選択とビュー切替 */}
//             {!isDesktop && (
//               <div className="bg-white rounded-xl p-4 shadow-md mb-6">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                   <h2 className="font-bold text-lg">
//                     {viewMode === 'month'
//                       ? `${currentYear}年${currentMonth + 1}月の状況`
//                       : '今週の状況'}
//                   </h2>
//                   <div className="flex">
//                     <button
//                       onClick={switchToMonthView}
//                       className={`p-2 ${viewMode === 'month' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} rounded-l-lg`}
//                     >
//                       <CalendarIcon className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={switchToWeekView}
//                       className={`p-2 ${viewMode === 'week' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'} rounded-r-lg`}
//                     >
//                       <List className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* 月表示の場合は共通カレンダーコンポーネントを使用 */}
//             {viewMode === 'month' && (
//               <Calendar
//                 currentYear={currentYear}
//                 currentMonth={currentMonth}
//                 onPrevMonth={goToPreviousMonth}
//                 onNextMonth={goToNextMonth}
//                 monthlyAchievements={monthlyAchievements}
//                 onDateClick={handleDateClick}
//                 getDateString={getCalendarDateString}
//                 todayString={todayString}
//                 selectedDate={selectedDate}
//                 customClassName="mb-6"
//               />
//             )}

//             {/* 週表示の場合は独自のウィークリービューを表示 */}
//             {viewMode === 'week' && (
//               <div className="bg-white rounded-xl p-4 md:p-6 shadow-md mb-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <button
//                     onClick={goToPreviousWeek}
//                     className="p-2 hover:bg-gray-100 rounded-full"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <h2 className="text-lg md:text-xl font-bold">
//                     {`${weekDays[0].getFullYear()}年${weekDays[0].getMonth() + 1}月${weekDays[0].getDate()}日 - ${weekDays[6].getMonth() + 1}月${weekDays[6].getDate()}日`}
//                   </h2>
//                   <button
//                     onClick={goToNextWeek}
//                     className="p-2 hover:bg-gray-100 rounded-full"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-2 md:space-y-3">
//                   {weekDays.map((day, index) => {
//                     const dateStr = getDateString(day);
//                     const isCompleted = monthlyAchievements[dateStr] || false;
//                     const missions = missionsData[dateStr] || [];
//                     const isToday = day.toDateString() === today.toDateString();
//                     const isSelected = day.toDateString() === selectedDate.toDateString();

//                     return (
//                       <button
//                         key={index}
//                         onClick={() => handleDateClick(day)}
//                         className={`
//                           w-full p-2 md:p-3 rounded-lg flex items-center justify-between
//                           ${isToday ? 'border-2 border-blue-500' : 'border border-gray-200'}
//                           ${isSelected ? 'bg-blue-50' : 'bg-white'}
//                           hover:shadow-md transition-all duration-200
//                         `}
//                       >
//                         <div className="flex items-center">
//                           <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-2 md:mr-3 ${isCompleted ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white' : 'bg-gray-100'
//                             }`}>
//                             <span className="font-medium text-sm">{day.getDate()}</span>
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-800">{weekDayNames[day.getDay()]}曜日</p>
//                             <p className="text-xs text-gray-500">
//                               {missions.length > 0
//                                 ? `${missions.length}個のミッション`
//                                 : 'ミッションなし'}
//                             </p>
//                           </div>
//                         </div>

//                         {isCompleted && (
//                           <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
//                             達成済み
//                           </div>
//                         )}

//                         {missions.length > 0 && !isCompleted && (
//                           <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
//                             未達成
//                           </div>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* 選択した日の詳細情報 */}
//             <div className="bg-white rounded-xl p-4 shadow-md">
//               <h2 className="font-bold text-lg mb-4">
//                 選択した日: {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日（{weekDayNames[selectedDate.getDay()]}）
//               </h2>

//               {selectedDateMissions.length > 0 ? (
//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="flex items-center">
//                       <Shield className="w-5 h-5 mr-2 text-blue-500" />
//                       <span className="font-medium">ミッション達成状況</span>
//                     </div>
//                     <div className={`px-2 py-1 rounded-full text-xs font-medium ${isSelectedDateCompleted ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
//                       }`}>
//                       {isSelectedDateCompleted ? 'コンプリート' : '未達成'}
//                     </div>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
//                     <h3 className="font-medium mb-2 text-sm text-gray-600">ミッション一覧</h3>
//                     <div className="space-y-2">
//                       {selectedDateMissions.map((mission, index) => (
//                         <div
//                           key={index}
//                           className={`flex items-center p-2 rounded ${mission.completed ? 'bg-blue-50' : 'bg-white border border-gray-200'
//                             }`}
//                         >
//                           <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${mission.completed
//                             ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
//                             : 'border-2 border-gray-300'
//                             }`}>
//                             {mission.completed && <CheckCircle className="w-4 h-4" />}
//                           </div>
//                           <div className="flex items-center">
//                             {mission.icon}
//                             <span className={`ml-1 text-sm ${mission.completed ? 'line-through text-gray-500' : ''}`}>
//                               {mission.title}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
//                   <Info className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-gray-500 text-center">この日にはミッションが登録されていません</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CalendarPage;
