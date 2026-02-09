const QUICK_LINK_NAMES = {
  EXTERNAL_URL: 'externalUrl',
} as const;

const CODEMIE_NAMES = {
  TOKEN_ENDPOINT: 'tokenEndpoint',
  API_URL: 'apiUrl',
  NAME: 'name',
} as const;

const CODEMIE_SECRET_NAMES = {
  CLIENT_ID: 'clientId',
  CLIENT_SECRET: 'clientSecret',
  NAME: 'name',
} as const;

export const QUICK_LINK_FORM_NAMES = {
  [QUICK_LINK_NAMES.EXTERNAL_URL]: {
    name: QUICK_LINK_NAMES.EXTERNAL_URL,
    path: ['spec', 'url'],
  },
};

export const CODEMIE_FORM_NAMES = {
  [CODEMIE_NAMES.TOKEN_ENDPOINT]: {
    name: CODEMIE_NAMES.TOKEN_ENDPOINT,
    path: ['spec', 'oidc', 'tokenEndpoint'],
  },
  [CODEMIE_NAMES.API_URL]: {
    name: CODEMIE_NAMES.API_URL,
    path: ['spec', 'url'],
  },
  [CODEMIE_NAMES.NAME]: {
    name: CODEMIE_NAMES.NAME,
    path: ['spec', 'oidc', 'secretRef', 'name'],
  },
};

export const CODEMIE_SECRET_FORM_NAMES = {
  [CODEMIE_SECRET_NAMES.CLIENT_ID]: {
    name: CODEMIE_SECRET_NAMES.CLIENT_ID,
    path: ['data', 'client_id'],
  },
  [CODEMIE_SECRET_NAMES.CLIENT_SECRET]: {
    name: CODEMIE_SECRET_NAMES.CLIENT_SECRET,
    path: ['data', 'client_secret'],
  },
  [CODEMIE_SECRET_NAMES.NAME]: {
    name: CODEMIE_SECRET_NAMES.NAME,
    path: ['metadata', 'name'],
  },
};
