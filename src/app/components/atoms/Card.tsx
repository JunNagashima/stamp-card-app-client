'use client';

import React from 'react';

/**
 * カードのバリアント型
 */
type CardVariant = 'default' | 'outline' | 'elevated';

/**
 * Cardコンポーネントのプロップス型
 */
interface CardProps {
  /** カード内のコンテンツ */
  children: React.ReactNode;
  /** カードのスタイルバリアント */
  variant?: CardVariant;
  /** ホバー時に影を付けるかどうか */
  hover?: boolean;
  /** カードヘッダー */
  header?: React.ReactNode;
  /** カードフッター */
  footer?: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * Card - カードコンポーネント
 * コンテンツをグループ化するためのコンテナ
 */
const Card = ({
  children,
  variant = 'default',
  hover = false,
  header,
  footer,
  className = '',
  ...rest
}: CardProps) => {
  // バリアントに応じたスタイル
  const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white shadow-md',
    outline: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg'
  };

  const baseClasses = 'rounded-xl p-4 md:p-6';
  const hoverClass = hover ? 'transition-shadow duration-200 hover:shadow-lg' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClass} ${className}`}
      {...rest}
    >
      {header && (
        <div className="mb-4 pb-2 border-b border-gray-100">
          {header}
        </div>
      )}

      <div>
        {children}
      </div>

      {footer && (
        <div className="mt-4 pt-2 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
