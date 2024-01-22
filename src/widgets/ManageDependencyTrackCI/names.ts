const NAMES = {
    TOKEN: 'token',
    URL: 'url',
    EXTERNAL_URL: 'externalUrl',
} as const;

export const DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES = {
    [NAMES.TOKEN]: {
        name: NAMES.TOKEN,
    },
    [NAMES.URL]: {
        name: NAMES.URL,
    },
    [NAMES.EXTERNAL_URL]: {
        name: NAMES.EXTERNAL_URL,
    },
};
