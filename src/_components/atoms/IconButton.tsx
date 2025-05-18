'use client';
import { cloneElement } from 'react';
import type { ReactElement, MouseEvent, ButtonHTMLAttributes, SVGProps } from 'react';

/**
 * アイコンボタンのバリアント型
 */
type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * アイコンボタンのサイズ型
 */
type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * IconButtonコンポーネントのプロップス型
 */
interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** ボタンに表示するアイコン */
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  /** ボタンのスタイルバリアント */
  variant?: IconButtonVariant;
  /** ボタンのサイズ */
  size?: IconButtonSize;
  /** 無効状態かどうか */
  disabled?: boolean;
  /** クリック時のコールバック関数 */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 追加のCSSクラス */
  className?: string;
  /** ホバー時に表示するツールチップ */
  tooltip?: string;
}

/**
 * IconButton - アイコンのみのボタンコンポーネント
 */
const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  tooltip = '',
  ...rest
}: IconButtonProps) => {
  // サイズに応じたスタイル
  const sizeClasses: Record<IconButtonSize, string> = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  // アイコンサイズ
  const iconSizes: Record<IconButtonSize, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // バリアントに応じたスタイル
  const variantClasses: Record<IconButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-700',
    ghost: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 bg-transparent',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  const baseClasses = 'rounded-full transition-colors duration-200 flex items-center justify-center';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClass} ${className}`}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      title={tooltip}
      {...rest}
    >
      {cloneElement(icon, { className: iconSizes[size] })}
    </button>
  );
};

export default IconButton;
