'use client';

import React from 'react';

/**
 * プログレスバーのバリアント型
 */
type ProgressBarVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/**
 * プログレスバーのサイズ型
 */
type ProgressBarSize = 'sm' | 'md' | 'lg';

/**
 * ProgressBarコンポーネントのプロップス型
 */
interface ProgressBarProps {
  /** 進捗値 (0-100) */
  value?: number;
  /** プログレスバーのスタイルバリアント */
  variant?: ProgressBarVariant;
  /** 進捗率のラベルを表示するかどうか */
  showLabel?: boolean;
  /** アニメーション効果を適用するかどうか */
  animated?: boolean;
  /** バーの高さ */
  size?: ProgressBarSize;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * ProgressBar - 進捗バーコンポーネント
 * タスク完了率やステータスの視覚的表現に使用
 */
const ProgressBar = ({
  value = 0,
  variant = 'primary',
  showLabel = false,
  animated = true,
  size = 'md',
  className = '',
  ...rest
}: ProgressBarProps) => {
  // 値の正規化（0〜100の範囲に収める）
  const normalizedValue = Math.min(Math.max(0, value), 100);

  // サイズに応じたスタイル
  const sizeClasses: Record<ProgressBarSize, string> = {
    sm: 'h-1',
    md: 'h-3',
    lg: 'h-5'
  };

  // バリアントに応じたスタイル
  const variantClasses: Record<ProgressBarVariant, string> = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500',
    secondary: 'bg-gray-500',
    success: 'bg-gradient-to-r from-green-400 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    danger: 'bg-gradient-to-r from-red-400 to-red-600'
  };

  const baseClasses = 'rounded-full';
  const animatedClass = animated ? 'transition-all duration-500' : '';

  return (
    <div className="w-full">
      <div
        className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        <div
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${animatedClass}`}
          style={{ width: `${normalizedValue}%` }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {showLabel && size === 'lg' && (
            <span className="text-xs text-white font-bold px-2">{normalizedValue}%</span>
          )}
        </div>
      </div>
      {showLabel && size !== 'lg' && (
        <div className="text-xs text-gray-600 mt-1 text-right">{normalizedValue}%</div>
      )}
    </div>
  );
};

export default ProgressBar;
