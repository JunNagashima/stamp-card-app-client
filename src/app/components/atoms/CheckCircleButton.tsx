'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { CheckCircle } from 'lucide-react';

/**
 * チェックサークルのサイズ型
 */
type CheckCircleSize = 'sm' | 'md' | 'lg';

/**
 * CheckCircleButtonコンポーネントのプロップス型
 */
interface CheckCircleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** チェック状態 */
  checked?: boolean;
  /** 状態変更時のコールバック関数 */
  onChange?: () => void;
  /** サイズ */
  size?: CheckCircleSize;
  /** 無効状態かどうか */
  disabled?: boolean;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * CheckCircleButton - チェック可能な円形ボタンコンポーネント
 * ミッションの完了状態を表示するのに使用
 */
const CheckCircleButton = ({
  checked = false,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}: CheckCircleButtonProps) => {
  // サイズに応じたスタイル
  const sizeClasses: Record<CheckCircleSize, string> = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 md:w-8 md:h-8',
    lg: 'w-9 h-9 md:w-10 md:h-10'
  };

  // チェックアイコンのサイズ
  const iconSizes: Record<CheckCircleSize, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4 md:w-5 md:h-5',
    lg: 'w-5 h-5 md:w-6 md:h-6'
  };

  const baseClasses = 'rounded-full flex items-center justify-center transition-all duration-200';
  const checkedClasses = checked ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white' : 'border-2 border-gray-300';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${checkedClasses} ${disabledClass} ${className}`}
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      type="button"
      aria-checked={checked}
      role="checkbox"
      {...rest}
    >
      {checked && <CheckCircle className={iconSizes[size]} />}
    </button>
  );
};

export default CheckCircleButton;
