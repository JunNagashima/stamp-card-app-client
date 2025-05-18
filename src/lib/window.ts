type WindowSize = 'mobile' | 'tablet' | 'desktop';

export const getWindowSize = (): WindowSize => {
  const width = window.innerWidth

  // 画面サイズに応じたレイアウト判定
  if (width < 768) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}
