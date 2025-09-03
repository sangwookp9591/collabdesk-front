export const colorUtils = {
  // string을 color hash로 변경
  stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 70%)`;
    return color;
  },
  // string에서 대비되는 font color로 변경
  getContrastColor(hexColor: string) {
    // hex → RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // YIQ 공식으로 밝기 계산
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  },

  stringToGradient(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue1 = hash % 360;
    const hue2 = (hue1 + 30) % 360; // +30도 차이

    const color1 = `hsl(${hue1}, 60%, 70%)`;
    const color2 = `hsl(${hue2}, 60%, 70%)`;

    return {
      color1,
      color2,
      gradient: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    };
  },
};
