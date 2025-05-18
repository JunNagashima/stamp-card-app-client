'use client';

import React, { useState, ReactNode } from 'react';
import {
  User, Search, Bell,
  Menu, X
} from 'lucide-react';
import SidebarContent from '@/app/components/organisms/SideBarContent';

const Default = ({ children }: { children: ReactNode }) => {
  // モバイルサイドバー表示状態
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg p-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* モバイル・タブレット時のみ表示されるハンバーガーメニュー */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-3 p-2 rounded-full hover:bg-white/10 lg:hidden"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold">ミッションスタンプ</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* モバイル以外で表示する検索ボタン */}
            <button className="p-2 rounded-full hover:bg-white/10 hidden sm:block">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-300 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* モバイルサイドバー */}
          <div className={`fixed inset-0 bg-black opacity-40 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
            onClick={() => setSidebarOpen(false)} />

          <div className={`fixed inset-y-0 left-0 w-4/5 md:w-2/3 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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


          {/* 中央コンテンツ： */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Default;
