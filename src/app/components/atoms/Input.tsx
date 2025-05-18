'use client';

import React, { InputHTMLAttributes } from 'react';

/**
 * Inputコンポーネントのプロップス型
 */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** 入力タイプ */
  type?: string;
  /** 入力値 */
  value: string;
  /** 値変更時のコールバック関数 */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** 左側に表示するアイコン */
  leftIcon?: React.ReactNode;
  /** 右側に表示するアイコン */
  rightIcon?: React.ReactNode;
  /** エラー状態かどうか */
  error?: boolean;
  /** エラーメッセージ */
  errorMessage?: string;
  /** 無効状態かどうか */
  disabled?: boolean;
  /** 追加のCSSクラス */
  className?: string;
  /** キー押下時のコールバック関数 */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** フォーカスが外れた時のコールバック関数 */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Input - 入力フィールドコンポーネント
 */
const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  leftIcon,
  rightIcon,
  error = false,
  errorMessage = '',
  disabled = false,
  className = '',
  onKeyDown,
  onBlur,
  ...rest
}: InputProps) => {
  const baseClasses = 'w-full focus:outline-none focus:ring-2 transition-all duration-200';
  const normalClasses = 'border rounded-lg p-2 focus:ring-blue-500';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const disabledClass = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';
  const iconPadding = leftIcon ? 'pl-9' : rightIcon ? 'pr-9' : '';

  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {leftIcon}
        </div>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${normalClasses} ${error ? errorClasses : ''} ${disabledClass} ${iconPadding} ${className}`}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        {...rest}
      />

      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {rightIcon}
        </div>
      )}

      {error && errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
