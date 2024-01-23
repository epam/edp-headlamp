import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE } from '../../k8s/EDPCodebase/labels';

const NAMES = {
  TYPE: 'type',
  STRATEGY: 'strategy',
  GIT_SERVER: 'gitServer',
  GIT_URL_PATH: 'gitUrlPath',
  EMPTY_PROJECT: 'emptyProject',
  NAME: 'name',
  NAMESPACE: 'namespace',
  DESCRIPTION: 'description',
  DEFAULT_BRANCH: 'defaultBranch',
  LANG: 'lang',
  FRAMEWORK: 'framework',
  BUILD_TOOL: 'buildTool',
  VERSIONING_TYPE: 'versioningType',
  VERSIONING_START_FROM: 'versioningStartFrom',
  DEPLOYMENT_SCRIPT: 'deploymentScript',
  CI_TOOL: 'ciTool',
  GIT_REPO_PATH: 'gitRepoPath',
  SYSTEM_TYPE_LABEL: 'systemTypeLabel',
} as const;

export const CODEBASE_FORM_NAMES = {
  // DEFAULT VALUES
  [NAMES.CI_TOOL]: {
    name: NAMES.CI_TOOL,
    path: ['spec', 'ciTool'],
  },

  [NAMES.TYPE]: {
    name: NAMES.TYPE,
    path: ['spec', 'type'],
  },
  [NAMES.STRATEGY]: {
    name: NAMES.STRATEGY,
    path: ['spec', 'strategy'],
  },
  [NAMES.GIT_SERVER]: {
    name: NAMES.GIT_SERVER,
    path: ['spec', 'gitServer'],
  },
  [NAMES.GIT_URL_PATH]: {
    name: NAMES.GIT_URL_PATH,
    path: ['spec', 'gitUrlPath'],
  },
  [NAMES.EMPTY_PROJECT]: {
    name: NAMES.EMPTY_PROJECT,
    path: ['spec', 'emptyProject'],
  },
  [NAMES.NAME]: {
    name: NAMES.NAME,
    path: ['metadata', 'name'],
  },
  [NAMES.NAMESPACE]: {
    name: NAMES.NAMESPACE,
    path: ['metadata', 'namespace'],
  },
  [NAMES.DESCRIPTION]: {
    name: NAMES.DESCRIPTION,
    path: ['spec', 'description'],
  },
  [NAMES.DEFAULT_BRANCH]: {
    name: NAMES.DEFAULT_BRANCH,
    path: ['spec', 'defaultBranch'],
  },
  [NAMES.LANG]: {
    name: NAMES.LANG,
    path: ['spec', 'lang'],
  },
  [NAMES.FRAMEWORK]: {
    name: NAMES.FRAMEWORK,
    path: ['spec', 'framework'],
  },
  [NAMES.BUILD_TOOL]: {
    name: NAMES.BUILD_TOOL,
    path: ['spec', 'buildTool'],
  },
  [NAMES.VERSIONING_TYPE]: {
    name: NAMES.VERSIONING_TYPE,
    path: ['spec', 'versioning', 'type'],
  },
  [NAMES.VERSIONING_START_FROM]: {
    name: NAMES.VERSIONING_START_FROM,
    path: ['spec', 'versioning', 'startFrom'],
  },
  [NAMES.DEPLOYMENT_SCRIPT]: {
    name: NAMES.DEPLOYMENT_SCRIPT,
    path: ['spec', 'deploymentScript'],
  },
  [NAMES.GIT_REPO_PATH]: {
    name: NAMES.GIT_REPO_PATH,
  },
  [NAMES.SYSTEM_TYPE_LABEL]: {
    name: NAMES.SYSTEM_TYPE_LABEL,
    path: ['metadata', 'labels', CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE_SYSTEM_TYPE],
  },
};
