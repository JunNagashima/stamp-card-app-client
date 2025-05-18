'use client';

import React, { ButtonHTMLAttributes } from 'react';

/**
 * ボタンのバリアント型
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * ボタンのサイズ型
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Buttonコンポーネントのプロップス型
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** ボタン内のコンテンツ */
  children: React.ReactNode;
  /** ボタンのスタイルバリアント */
  variant?: ButtonVariant;
  /** ボタンの左側に表示するアイコン */
  leftIcon?: React.ReactNode;
  /** ボタンの右側に表示するアイコン */
  rightIcon?: React.ReactNode;
  /** 幅いっぱいに表示するかどうか */
  fullWidth?: boolean;
  /** ボタンのサイズ */
  size?: ButtonSize;
  /** 無効状態かどうか */
  disabled?: boolean;
  /** クリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * Button - 汎用ボタンコンポーネント
 */
const Button = ({
  children,
  variant = 'primary',
  leftIcon,
  rightIcon,
  fullWidth = false,
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...rest
}: ButtonProps) => {
  // サイズに応じたスタイル
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  // バリアントに応じたスタイル
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300',
    outline: 'bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  const baseClasses = 'rounded-lg font-medium transition-colors duration-200 flex items-center justify-center';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
