'use client';

import React from 'react';

/**
 * バッジのバリアント型
 */
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * バッジのサイズ型
 */
type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badgeコンポーネントのプロップス型
 */
interface BadgeProps {
  /** バッジ内のコンテンツ */
  children: React.ReactNode;
  /** バッジのスタイルバリアント */
  variant?: BadgeVariant;
  /** 完全な丸形にするかどうか */
  rounded?: boolean;
  /** バッジのサイズ */
  size?: BadgeSize;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * Badge - バッジコンポーネント
 * 数字や状態を表示するために使用
 */
const Badge = ({
  children,
  variant = 'primary',
  rounded = false,
  size = 'md',
  className = '',
  ...rest
}: BadgeProps) => {
  // サイズに応じたスタイル
  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  // バリアントに応じたスタイル
  const variantClasses: Record<BadgeVariant, string> = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    info: 'bg-purple-100 text-purple-600'
  };

  const baseClasses = 'font-medium inline-flex items-center justify-center';
  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${roundedClass} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
