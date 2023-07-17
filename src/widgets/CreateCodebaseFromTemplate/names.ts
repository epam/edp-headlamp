const NAMES = {
    NAME: 'name',
    DESCRIPTION: 'description',
    LANG: 'lang',
    FRAMEWORK: 'framework',
    BUILD_TOOL: 'buildTool',
    STRATEGY: 'strategy',
    TYPE: 'type',
    VERSIONING_TYPE: 'versioningType',
    VERSIONING_START_FROM: 'versioningStartFrom',
    CI_TOOL: 'ciTool',
    REPOSITORY_URL: 'repositoryUrl',
    GIT_SERVER: 'gitServer',
    GIT_URL_PATH: 'gitUrlPath',
    DEFAULT_BRANCH: 'defaultBranch',
    EMPTY_PROJECT: 'emptyProject',

    // NOT USED IN RESOURCE DATA
    VERSIONING_START_FROM_VERSION: 'versioningStartFromVersion',
    VERSIONING_START_FROM_POSTFIX: 'versioningStartFromPostfix',
} as const;

export const CODEBASE_FROM_TEMPLATE_FORM_NAMES = {
    [NAMES.NAME]: {
        name: NAMES.NAME,
        path: ['metadata', 'name'],
    },
    [NAMES.DESCRIPTION]: {
        name: NAMES.DESCRIPTION,
        path: ['spec', 'description'],
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
    [NAMES.STRATEGY]: {
        name: NAMES.STRATEGY,
        path: ['spec', 'strategy'],
    },
    [NAMES.TYPE]: {
        name: NAMES.TYPE,
        path: ['spec', 'type'],
    },
    [NAMES.VERSIONING_TYPE]: {
        name: NAMES.VERSIONING_TYPE,
        path: ['spec', 'versioning', 'type'],
    },
    [NAMES.VERSIONING_START_FROM]: {
        name: NAMES.VERSIONING_START_FROM,
        path: ['spec', 'versioning', 'startFrom'],
    },
    [NAMES.CI_TOOL]: {
        name: NAMES.CI_TOOL,
        path: ['spec', 'ciTool'],
    },
    [NAMES.REPOSITORY_URL]: {
        name: NAMES.REPOSITORY_URL,
        path: ['spec', 'repository', 'url'],
    },
    [NAMES.GIT_SERVER]: {
        name: NAMES.GIT_SERVER,
        path: ['spec', 'gitServer'],
    },
    [NAMES.GIT_URL_PATH]: {
        name: NAMES.GIT_URL_PATH,
        path: ['spec', 'gitUrlPath'],
    },
    [NAMES.DEFAULT_BRANCH]: {
        name: NAMES.DEFAULT_BRANCH,
        path: ['spec', 'defaultBranch'],
    },
    [NAMES.EMPTY_PROJECT]: {
        name: NAMES.EMPTY_PROJECT,
        path: ['spec', 'emptyProject'],
    },

    // NOT USED IN RESOURCE DATA
    [NAMES.VERSIONING_START_FROM_VERSION]: {
        name: NAMES.VERSIONING_START_FROM_VERSION,
        notUsedInFormData: true,
    },
    [NAMES.VERSIONING_START_FROM_POSTFIX]: {
        name: NAMES.VERSIONING_START_FROM_POSTFIX,
        notUsedInFormData: true,
    },
};
