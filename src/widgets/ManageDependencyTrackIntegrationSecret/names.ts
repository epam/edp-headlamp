const NAMES = {
    TOKEN: 'token',
    URL: 'url',
} as const;

export const DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES = {
    [NAMES.TOKEN]: {
        name: NAMES.TOKEN,
    },
    [NAMES.URL]: {
        name: NAMES.URL,
    },
};
