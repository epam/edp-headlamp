import { ValueOf } from '../types/global';

export const ACTION_MENU_TYPE = {
  MENU: 'menu',
  INLINE: 'inline',
} as const;

export type ActionMenuType = ValueOf<typeof ACTION_MENU_TYPE>;
