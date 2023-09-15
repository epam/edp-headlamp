const NAMES = {
    USERNAME: 'username',
    PASSWORD: 'password',
    URL: 'url',
} as const;

export const JIRA_INTEGRATION_SECRET_FORM_NAMES = {
    [NAMES.USERNAME]: {
        name: NAMES.USERNAME,
    },
    [NAMES.PASSWORD]: {
        name: NAMES.PASSWORD,
    },
    [NAMES.URL]: {
        name: NAMES.URL,
    },
};
