const NAMES = {
  ICON: 'icon',
  NAME: 'name',
  URL: 'url',
  VISIBLE: 'visible',
} as const;

export const QUICK_LINK_FORM_NAMES = {
  [NAMES.ICON]: {
    name: NAMES.ICON,
    path: ['spec', 'icon'],
  },
  [NAMES.NAME]: {
    name: NAMES.NAME,
    path: ['spec', 'type'],
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
