const JIRA_CI_NAMES = {
  USERNAME: 'username',
  PASSWORD: 'password',
  URL: 'url',
} as const;

export const JIRA_CI_FORM_NAMES = {
  [JIRA_CI_NAMES.USERNAME]: {
    name: JIRA_CI_NAMES.USERNAME,
  },
  [JIRA_CI_NAMES.PASSWORD]: {
    name: JIRA_CI_NAMES.PASSWORD,
  },
  [JIRA_CI_NAMES.URL]: {
    name: JIRA_CI_NAMES.URL,
  },
};

export const JIRA_SERVER_FORM_NAMES = {
  [JIRA_CI_NAMES.URL]: {
    name: JIRA_CI_NAMES.URL,
  },
};
