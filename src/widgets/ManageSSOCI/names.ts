const NAMES = {
  USERNAME: 'username',
  PASSWORD: 'password',
} as const;

export const SSO_INTEGRATION_SECRET_FORM_NAMES = {
  [NAMES.USERNAME]: {
    name: NAMES.USERNAME,
  },
  [NAMES.PASSWORD]: {
    name: NAMES.PASSWORD,
  },
};
