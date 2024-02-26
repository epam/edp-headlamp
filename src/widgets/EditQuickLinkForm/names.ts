const NAMES = {
  ICON: 'icon',
  URL: 'url',
  VISIBLE: 'visible',
} as const;

export const QUICK_LINK_FORM_NAMES = {
  [NAMES.ICON]: {
    name: NAMES.ICON,
    path: ['spec', 'icon'],
  },
  [NAMES.URL]: {
    name: NAMES.URL,
    path: ['spec', 'url'],
  },

  [NAMES.VISIBLE]: {
    name: NAMES.VISIBLE,
    path: ['spec', 'visible'],
  },
};
