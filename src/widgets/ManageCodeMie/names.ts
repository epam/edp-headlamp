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

const CODEMIE_PROJECT_NAMES = {
  PROJECT_NAME: 'projectName',
  CODEMIE_REF_NAME: 'codemieRefName',
} as const;

const CODEMIE_PROJECT_SETTINGS_NAMES = {
  ALIAS: 'alias',
  PROJECT_NAME: 'projectName',
  TYPE: 'type',
  TOKEN_NAME: 'tokenName',
  TOKEN: 'token',
  URL: 'url',
  NAME: 'name',
  CODEMIE_REF_NAME: 'codemieRefName',
} as const;

const CODEMIE_PROJECT_SETTINGS_SECRET_NAMES = {
  PROJECT_NAME: 'projectName',
  TOKEN: 'token',
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

export const CODEMIE_PROJECT_FORM_NAMES = {
  [CODEMIE_PROJECT_NAMES.PROJECT_NAME]: {
    name: CODEMIE_PROJECT_NAMES.PROJECT_NAME,
  },
  [CODEMIE_PROJECT_NAMES.CODEMIE_REF_NAME]: {
    name: CODEMIE_PROJECT_NAMES.CODEMIE_REF_NAME,
    path: ['spec', 'codemieRef', 'name'],
  },
};

export const CODEMIE_PROJECT_SETTINGS_FORM_NAMES = {
  [CODEMIE_PROJECT_SETTINGS_NAMES.ALIAS]: {
    name: CODEMIE_PROJECT_SETTINGS_NAMES.ALIAS,
    path: ['spec', 'alias'],
  },
  [CODEMIE_PROJECT_SETTINGS_NAMES.PROJECT_NAME]: {
    name: CODEMIE_PROJECT_SETTINGS_NAMES.PROJECT_NAME,
    path: ['spec', 'projectName'],
  },
  [CODEMIE_PROJECT_SETTINGS_NAMES.TYPE]: {
    name: CODEMIE_PROJECT_SETTINGS_NAMES.TYPE,
    path: ['spec', 'type'],
  },
  [CODEMIE_PROJECT_SETTINGS_NAMES.TOKEN_NAME]: {
    name: CODEMIE_PROJECT_SETTINGS_NAMES.TOKEN_NAME,
    path: ['spec', 'gitCredential', 'tokenName'],
  },
  [CODEMIE_PROJECT_SETTINGS_NAMES.URL]: {
    name: CODEMIE_PROJECT_SETTINGS_NAMES.URL,
    path: ['spec', 'gitCredential', 'url'],
  },
  [CODEMIE_PROJECT_SETTINGS_NAMES.CODEMIE_REF_NAME]: {
    name: CODEMIE_PROJECT_SETTINGS_NAMES.CODEMIE_REF_NAME,
    path: ['spec', 'codemieRef', 'name'],
  },
};

export const CODEMIE_PROJECT_SETTINGS_SECRET_FORM_NAMES = {
  [CODEMIE_PROJECT_SETTINGS_SECRET_NAMES.PROJECT_NAME]: {
    name: CODEMIE_PROJECT_SETTINGS_SECRET_NAMES.PROJECT_NAME,
  },
  [CODEMIE_PROJECT_SETTINGS_SECRET_NAMES.TOKEN]: {
    name: CODEMIE_PROJECT_SETTINGS_SECRET_NAMES.TOKEN,
    path: ['data', 'token'],
  },
};
