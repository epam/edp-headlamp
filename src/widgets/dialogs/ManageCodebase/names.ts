import { CODEBASE_LABEL_SELECTOR_CODEMIE_INTEGRATION } from '../../../k8s/groups/EDP/Codebase/labels';
import { BackwardNameMapping } from '../../../types/forms';
import { CONFIGURATION_STEPS } from './constants';

export const NAMES = {
  TYPE: 'type',
  STRATEGY: 'strategy',
  REPOSITORY_URL: 'repositoryUrl',
  GIT_SERVER: 'gitServer',
  GIT_URL_PATH: 'gitUrlPath',
  EMPTY_PROJECT: 'emptyProject',
  PRIVATE: 'private',
  NAME: 'name',
  NAMESPACE: 'namespace',
  DESCRIPTION: 'description',
  DEFAULT_BRANCH: 'defaultBranch',
  LANG: 'lang',
  FRAMEWORK: 'framework',
  BUILD_TOOL: 'buildTool',
  TEST_REPORT_FRAMEWORK: 'testReportFramework',
  VERSIONING_TYPE: 'versioningType',
  VERSIONING_START_FROM: 'versioningStartFrom',
  DEPLOYMENT_SCRIPT: 'deploymentScript',
  CI_TOOL: 'ciTool',
  JIRA_SERVER: 'jiraServer',
  COMMIT_MESSAGE_PATTERN: 'commitMessagePattern',
  TICKET_NAME_PATTERN: 'ticketNamePattern',
  JIRA_ISSUE_METADATA_PAYLOAD: 'jiraIssueMetadataPayload',
  CODEMIE_INTEGRATION_LABEL: 'codemieIntegrationLabel',

  // NOT DIRECTLY USED IN RESOURCE DATA
  HAS_CODEBASE_AUTH: 'hasCodebaseAuth',
  REPOSITORY_LOGIN: 'repositoryLogin',
  REPOSITORY_PASSWORD_OR_API_TOKEN: 'repositoryPasswordOrApiToken',
  HAS_JIRA_SERVER_INTEGRATION: 'hasJiraServerIntegration',
  HAS_CODEMIE_INTEGRATION: 'hasCodemieIntegration',
  VERSIONING_START_FROM_VERSION: 'versioningStartFromVersion',
  VERSIONING_START_FROM_SNAPSHOT: 'versioningStartFromSnapshot',
  ADVANCED_MAPPING_FIELD_NAME: 'advancedMappingFieldName',
  ADVANCED_MAPPING_JIRA_PATTERN: 'advancedMappingJiraPattern',
  REPOSITORY_NAME: 'repositoryName',
  REPOSITORY_OWNER: 'repositoryOwner',
} as const;

export const CODEBASE_FORM_NAMES = {
  // DEFAULT VALUES
  [NAMES.CI_TOOL]: {
    name: NAMES.CI_TOOL,
    path: ['spec', 'ciTool'],
  },

  [NAMES.TYPE]: {
    name: NAMES.TYPE,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'type'],
  },
  [NAMES.STRATEGY]: {
    name: NAMES.STRATEGY,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'strategy'],
  },
  [NAMES.REPOSITORY_URL]: {
    name: NAMES.REPOSITORY_URL,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'repository', 'url'],
  },
  [NAMES.GIT_SERVER]: {
    name: NAMES.GIT_SERVER,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'gitServer'],
  },
  [NAMES.GIT_URL_PATH]: {
    name: NAMES.GIT_URL_PATH,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'gitUrlPath'],
  },
  [NAMES.EMPTY_PROJECT]: {
    name: NAMES.EMPTY_PROJECT,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'emptyProject'],
  },
  [NAMES.PRIVATE]: {
    name: NAMES.PRIVATE,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'private'],
  },
  [NAMES.NAME]: {
    name: NAMES.NAME,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['metadata', 'name'],
  },
  [NAMES.NAMESPACE]: {
    name: NAMES.NAMESPACE,
    path: ['metadata', 'namespace'],
  },
  [NAMES.DESCRIPTION]: {
    name: NAMES.DESCRIPTION,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'description'],
  },
  [NAMES.DEFAULT_BRANCH]: {
    name: NAMES.DEFAULT_BRANCH,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'defaultBranch'],
  },
  [NAMES.LANG]: {
    name: NAMES.LANG,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'lang'],
  },
  [NAMES.FRAMEWORK]: {
    name: NAMES.FRAMEWORK,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'framework'],
  },
  [NAMES.BUILD_TOOL]: {
    name: NAMES.BUILD_TOOL,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'buildTool'],
  },
  [NAMES.TEST_REPORT_FRAMEWORK]: {
    name: NAMES.TEST_REPORT_FRAMEWORK,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    path: ['spec', 'testReportFramework'],
  },
  [NAMES.VERSIONING_TYPE]: {
    name: NAMES.VERSIONING_TYPE,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'versioning', 'type'],
  },
  [NAMES.VERSIONING_START_FROM]: {
    name: NAMES.VERSIONING_START_FROM,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'versioning', 'startFrom'],
  },
  [NAMES.DEPLOYMENT_SCRIPT]: {
    name: NAMES.DEPLOYMENT_SCRIPT,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'deploymentScript'],
  },
  [NAMES.JIRA_SERVER]: {
    name: NAMES.JIRA_SERVER,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'jiraServer'],
  },
  [NAMES.COMMIT_MESSAGE_PATTERN]: {
    name: NAMES.COMMIT_MESSAGE_PATTERN,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'commitMessagePattern'],
  },
  [NAMES.TICKET_NAME_PATTERN]: {
    name: NAMES.TICKET_NAME_PATTERN,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'ticketNamePattern'],
  },
  [NAMES.JIRA_ISSUE_METADATA_PAYLOAD]: {
    name: NAMES.JIRA_ISSUE_METADATA_PAYLOAD,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['spec', 'jiraIssueMetadataPayload'],
  },
  [NAMES.CODEMIE_INTEGRATION_LABEL]: {
    name: NAMES.CODEMIE_INTEGRATION_LABEL,
    formPart: CONFIGURATION_STEPS.ADVANCED_SETTINGS,
    path: ['metadata', 'labels', CODEBASE_LABEL_SELECTOR_CODEMIE_INTEGRATION],
  },

  // NOT USED IN RESOURCE DATA
  [NAMES.HAS_CODEBASE_AUTH]: {
    name: NAMES.HAS_CODEBASE_AUTH,
    notUsedInFormData: true,
  },
  [NAMES.REPOSITORY_LOGIN]: {
    name: NAMES.REPOSITORY_LOGIN,
    notUsedInFormData: true,
  },
  [NAMES.REPOSITORY_PASSWORD_OR_API_TOKEN]: {
    name: NAMES.REPOSITORY_PASSWORD_OR_API_TOKEN,
    notUsedInFormData: true,
  },
  [NAMES.HAS_JIRA_SERVER_INTEGRATION]: {
    name: NAMES.HAS_JIRA_SERVER_INTEGRATION,
    notUsedInFormData: true,
  },
  [NAMES.HAS_CODEMIE_INTEGRATION]: {
    name: NAMES.HAS_CODEMIE_INTEGRATION,
    notUsedInFormData: true,
  },
  [NAMES.VERSIONING_START_FROM_VERSION]: {
    name: NAMES.VERSIONING_START_FROM_VERSION,
    notUsedInFormData: true,
  },
  [NAMES.VERSIONING_START_FROM_SNAPSHOT]: {
    name: NAMES.VERSIONING_START_FROM_SNAPSHOT,
    notUsedInFormData: true,
  },
  [NAMES.ADVANCED_MAPPING_FIELD_NAME]: {
    name: NAMES.ADVANCED_MAPPING_FIELD_NAME,
    notUsedInFormData: true,
  },
  [NAMES.ADVANCED_MAPPING_JIRA_PATTERN]: {
    name: NAMES.ADVANCED_MAPPING_JIRA_PATTERN,
    notUsedInFormData: true,
  },
  [NAMES.REPOSITORY_NAME]: {
    name: NAMES.REPOSITORY_NAME,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    notUsedInFormData: true,
  },
  [NAMES.REPOSITORY_OWNER]: {
    name: NAMES.REPOSITORY_OWNER,
    formPart: CONFIGURATION_STEPS.CODEBASE_INFO,
    notUsedInFormData: true,
  },
};

export const CODEBASE_BACKWARDS_NAME_MAPPING: BackwardNameMapping = {
  repository: {
    children: {
      url: {
        formItemName: NAMES.REPOSITORY_URL,
      },
    },
  },
  versioning: {
    children: {
      startFrom: {
        formItemName: NAMES.VERSIONING_START_FROM,
      },
      type: {
        formItemName: NAMES.VERSIONING_TYPE,
      },
    },
  },
  labels: {
    children: {
      [CODEBASE_LABEL_SELECTOR_CODEMIE_INTEGRATION]: {
        formItemName: NAMES.CODEMIE_INTEGRATION_LABEL,
      },
    },
  },
};
