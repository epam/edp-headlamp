export const MAIN_COLOR = {
  BLUE: '#0094FF',
  DARK_PURPLE: '#766f94',
  ORANGE: '#FF8A00',
  GREEN: '#18BE94',
  RED: '#FF005C',
  GREY: '#A2A7B7',
};

export const STATUS_COLOR = {
  SUCCESS: MAIN_COLOR.GREEN,
  ERROR: MAIN_COLOR.RED,
  SUSPENDED: MAIN_COLOR.DARK_PURPLE,
  IN_PROGRESS: MAIN_COLOR.BLUE,
  MISSING: MAIN_COLOR.ORANGE,
  UNKNOWN: MAIN_COLOR.GREY,
} as const;

export const CHART_STATUS_COLOR = {
  SUCCESS: MAIN_COLOR.GREEN,
  ERROR: MAIN_COLOR.RED,
  SUSPENDED: MAIN_COLOR.DARK_PURPLE,
  IN_PROGRESS: MAIN_COLOR.BLUE,
  UNKNOWN: MAIN_COLOR.GREY,
} as const;
