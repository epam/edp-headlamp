const QUICK_LINK_NAMES = {
  EXTERNAL_URL: 'externalUrl',
} as const;

export const QUICK_LINK_FORM_NAMES = {
  [QUICK_LINK_NAMES.EXTERNAL_URL]: {
    name: QUICK_LINK_NAMES.EXTERNAL_URL,
    path: ['spec', 'url'],
  },
};

const INTEGRATION_SECRET_NAMES = {
  TOKEN: 'token',
  URL: 'url',
} as const;

export const INTEGRATION_SECRET_FORM_NAMES = {
  [INTEGRATION_SECRET_NAMES.TOKEN]: {
    name: INTEGRATION_SECRET_NAMES.TOKEN,
  },
  [INTEGRATION_SECRET_NAMES.URL]: {
    name: INTEGRATION_SECRET_NAMES.URL,
  },
};
