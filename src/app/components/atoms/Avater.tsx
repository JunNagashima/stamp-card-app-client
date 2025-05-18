'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * アバターのサイズ型
 */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * アバターの形状型
 */
type AvatarShape = 'circle' | 'square' | 'rounded';

/**
 * Avatarコンポーネントのプロップス型
 */
interface AvatarProps {
  /** 画像のURL */
  src?: string;
  /** 画像の代替テキスト */
  alt?: string;
  /** アバターのサイズ */
  size?: AvatarSize;
  /** アバターの形状 */
  shape?: AvatarShape;
  /** 画像が読み込めない場合に表示する要素 */
  fallback?: React.ReactNode;
  /** オンライン状態を示すインジケーターを表示するか */
  online?: boolean;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * Avatar - アバター/アイコンコンポーネント
 * ユーザーやアイテムの画像表示に使用
 */
const Avatar = ({
  src,
  alt = '',
  size = 'md',
  shape = 'circle',
  fallback,
  online,
  className = '',
  ...rest
}: AvatarProps) => {
  const [error, setError] = useState(false);

  // サイズに応じたスタイル
  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  // 形状に応じたスタイル
  const shapeClasses: Record<AvatarShape, string> = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const handleError = () => {
    setError(true);
  };

  // イニシャルをフォールバックとして使用
  const getInitials = (): string => {
    if (!alt) return '?';
    return alt
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const baseClasses = 'flex items-center justify-center relative bg-gray-200 text-gray-700 font-medium overflow-hidden';

  // インジケーターのサイズを計算
  const getIndicatorSize = (sizeClass: string): string => {
    const size = parseInt(sizeClass.replace('w-', ''));
    return `w-${Math.max(Math.floor(size / 3), 2)} h-${Math.max(Math.floor(size / 3), 2)}`;
  };

  const indicatorSize = getIndicatorSize(sizeClasses[size].split(' ')[0]);

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
      {...rest}
    >
      {!error && src ? (
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : fallback ? (
        fallback
      ) : (
        <span>{getInitials()}</span>
      )}

      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ${indicatorSize} ${online ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white`}
        />
      )}
    </div>
  );
};

export default Avatar;
