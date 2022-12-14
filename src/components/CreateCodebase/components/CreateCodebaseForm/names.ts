import { BackwardNameMapping, FormNameObject } from '../../../../types/forms';
import {
    FORM_PART_ADVANCED_SETTINGS,
    FORM_PART_CODEBASE_INFO,
    FORM_PART_CODEBASE_TYPE_INFO,
} from './constants';

export const CODEBASE_BACKWARDS_NAME_MAPPING: BackwardNameMapping = {
    repository: {
        children: {
            url: {
                formItemName: 'repositoryUrl',
            },
        },
    },
    versioning: {
        children: {
            startFrom: {
                formItemName: 'versioningStartFrom',
            },
            type: {
                formItemName: 'versioningType',
            },
        },
    },
};

export const CODEBASE_CREATION_NAME_API_VERSION: FormNameObject = {
    name: 'apiVersion',
    formPart: FORM_PART_CODEBASE_INFO,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_KIND: FormNameObject = {
    name: 'kind',
    formPart: FORM_PART_CODEBASE_INFO,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_HAS_CODEBASE_AUTH: FormNameObject = {
    name: 'hasCodebaseAuth',
    formPart: FORM_PART_CODEBASE_INFO,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_REPOSITORY_LOGIN: FormNameObject = {
    name: 'repositoryLogin',
    formPart: FORM_PART_CODEBASE_INFO,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_REPOSITORY_PASSWORD_OR_API_TOKEN: FormNameObject = {
    name: 'repositoryPasswordOrApiToken',
    formPart: FORM_PART_CODEBASE_INFO,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_HAS_JIRA_INTEGRATION: FormNameObject = {
    name: 'hasJiraServerIntegration',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_VERSIONING_START_FROM_VERSION: FormNameObject = {
    name: 'versioningStartFromVersion',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_VERSIONING_START_FROM_SNAPSHOT: FormNameObject = {
    name: 'versioningStartFromSnapshot',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_ADVANCED_MAPPING_FIELD_NAME: FormNameObject = {
    name: 'advancedMappingFieldName',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_ADVANCED_MAPPING_JIRA_PATTERN: FormNameObject = {
    name: 'advancedMappingJiraPattern',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_TYPE: FormNameObject = {
    name: 'type',
    formPart: FORM_PART_CODEBASE_INFO,
    notUsedInFormData: true,
    path: ['spec', 'type'],
};

export const CODEBASE_CREATION_NAME_STRATEGY: FormNameObject = {
    name: 'strategy',
    formPart: FORM_PART_CODEBASE_INFO,
    path: ['spec', 'strategy'],
};

export const CODEBASE_CREATION_NAME_REPOSITORY_URL: FormNameObject = {
    name: 'repositoryUrl',
    formPart: FORM_PART_CODEBASE_INFO,
    path: ['spec', 'repository', 'url'],
};

export const CODEBASE_CREATION_NAME_GIT_SERVER: FormNameObject = {
    name: 'gitServer',
    formPart: FORM_PART_CODEBASE_INFO,
    path: ['spec', 'gitServer'],
};

export const CODEBASE_CREATION_NAME_GIT_URL_PATH: FormNameObject = {
    name: 'gitUrlPath',
    formPart: FORM_PART_CODEBASE_INFO,
    path: ['spec', 'gitUrlPath'],
};

export const CODEBASE_CREATION_NAME_TEST_REPORT_FRAMEWORK: FormNameObject = {
    name: 'testReportFramework',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'testReportFramework'],
};

export const CODEBASE_CREATION_NAME_NAME: FormNameObject = {
    name: 'name',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['metadata', 'name'],
};

export const CODEBASE_CREATION_NAME_DESCRIPTION: FormNameObject = {
    name: 'description',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'description'],
};

export const CODEBASE_CREATION_NAME_DEFAULT_BRANCH: FormNameObject = {
    name: 'defaultBranch',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'defaultBranch'],
};

export const CODEBASE_CREATION_NAME_EMPTY_PROJECT: FormNameObject = {
    name: 'emptyProject',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'emptyProject'],
};

export const CODEBASE_CREATION_NAME_LANG: FormNameObject = {
    name: 'lang',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'lang'],
};

export const CODEBASE_CREATION_NAME_FRAMEWORK: FormNameObject = {
    name: 'framework',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'framework'],
};

export const CODEBASE_CREATION_NAME_BUILD_TOOL: FormNameObject = {
    name: 'buildTool',
    formPart: FORM_PART_CODEBASE_TYPE_INFO,
    path: ['spec', 'buildTool'],
};

export const CODEBASE_CREATION_NAME_JOB_PROVISIONING: FormNameObject = {
    name: 'jobProvisioning',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'jobProvisioning'],
};

export const CODEBASE_CREATION_NAME_JENKINS_SLAVE: FormNameObject = {
    name: 'jenkinsSlave',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'jenkinsSlave'],
};

export const CODEBASE_CREATION_NAME_VERSIONING_TYPE: FormNameObject = {
    name: 'versioningType',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'versioning', 'type'],
};

export const CODEBASE_CREATION_NAME_VERSIONING_START_FROM: FormNameObject = {
    name: 'versioningStartFrom',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'versioning', 'startFrom'],
};

export const CODEBASE_CREATION_NAME_DEPLOYMENT_SCRIPT: FormNameObject = {
    name: 'deploymentScript',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'deploymentScript'],
};

export const CODEBASE_CREATION_NAME_CI_TOOL: FormNameObject = {
    name: 'ciTool',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'ciTool'],
};

export const CODEBASE_CREATION_NAME_JIRA_SERVER: FormNameObject = {
    name: 'jiraServer',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'jiraServer'],
};

export const CODEBASE_CREATION_NAME_COMMIT_MESSAGE_PATTERN: FormNameObject = {
    name: 'commitMessagePattern',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'commitMessagePattern'],
};

export const CODEBASE_CREATION_NAME_TICKET_NAME_PATTERN: FormNameObject = {
    name: 'ticketNamePattern',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'ticketNamePattern'],
};

export const CODEBASE_CREATION_NAME_JIRA_ISSUE_METADATA_PAYLOAD: FormNameObject = {
    name: 'jiraIssueMetadataPayload',
    formPart: FORM_PART_ADVANCED_SETTINGS,
    path: ['spec', 'jiraIssueMetadataPayload'],
};

export const APPLICATION_NAMES: { [key: string]: FormNameObject } = {
    // NOT USED IN FORM DATA
    apiVersion: CODEBASE_CREATION_NAME_API_VERSION,
    kind: CODEBASE_CREATION_NAME_KIND,
    hasCodebaseAuth: CODEBASE_CREATION_NAME_HAS_CODEBASE_AUTH,
    repositoryLogin: CODEBASE_CREATION_NAME_REPOSITORY_LOGIN,
    repositoryPasswordOrApiToken: CODEBASE_CREATION_NAME_REPOSITORY_PASSWORD_OR_API_TOKEN,
    hasJiraServerIntegration: CODEBASE_CREATION_NAME_HAS_JIRA_INTEGRATION,
    versioningStartFromVersion: CODEBASE_CREATION_NAME_VERSIONING_START_FROM_VERSION,
    versioningStartFromSnapshot: CODEBASE_CREATION_NAME_VERSIONING_START_FROM_SNAPSHOT,
    advancedMappingFieldName: CODEBASE_CREATION_NAME_ADVANCED_MAPPING_FIELD_NAME,
    advancedMappingJiraPattern: CODEBASE_CREATION_NAME_ADVANCED_MAPPING_JIRA_PATTERN,

    // FORM PART CODEBASE INFO
    type: CODEBASE_CREATION_NAME_TYPE,
    strategy: CODEBASE_CREATION_NAME_STRATEGY,
    repositoryUrl: CODEBASE_CREATION_NAME_REPOSITORY_URL,
    gitServer: CODEBASE_CREATION_NAME_GIT_SERVER,
    gitUrlPath: CODEBASE_CREATION_NAME_GIT_URL_PATH,

    // FORM PART APPLICATION INFO
    name: CODEBASE_CREATION_NAME_NAME,
    defaultBranch: CODEBASE_CREATION_NAME_DEFAULT_BRANCH,
    emptyProject: CODEBASE_CREATION_NAME_EMPTY_PROJECT,
    lang: CODEBASE_CREATION_NAME_LANG,
    framework: CODEBASE_CREATION_NAME_FRAMEWORK,
    buildTool: CODEBASE_CREATION_NAME_BUILD_TOOL,

    // FORM PART ADVANCED SETTINGS
    jobProvisioning: CODEBASE_CREATION_NAME_JOB_PROVISIONING,
    jenkinsSlave: CODEBASE_CREATION_NAME_JENKINS_SLAVE,
    versioningType: CODEBASE_CREATION_NAME_VERSIONING_TYPE,
    versioningStartFrom: CODEBASE_CREATION_NAME_VERSIONING_START_FROM,
    deploymentScript: CODEBASE_CREATION_NAME_DEPLOYMENT_SCRIPT,
    ciTool: CODEBASE_CREATION_NAME_CI_TOOL,
    jiraServer: CODEBASE_CREATION_NAME_JIRA_SERVER,
    commitMessagePattern: CODEBASE_CREATION_NAME_COMMIT_MESSAGE_PATTERN,
    ticketNamePattern: CODEBASE_CREATION_NAME_TICKET_NAME_PATTERN,
    jiraIssueMetadataPayload: CODEBASE_CREATION_NAME_JIRA_ISSUE_METADATA_PAYLOAD,
};

export const LIBRARY_NAMES: { [key: string]: FormNameObject } = {
    // NOT USED IN FORM DATA
    apiVersion: CODEBASE_CREATION_NAME_API_VERSION,
    kind: CODEBASE_CREATION_NAME_KIND,
    hasCodebaseAuth: CODEBASE_CREATION_NAME_HAS_CODEBASE_AUTH,
    repositoryLogin: CODEBASE_CREATION_NAME_REPOSITORY_LOGIN,
    repositoryPasswordOrApiToken: CODEBASE_CREATION_NAME_REPOSITORY_PASSWORD_OR_API_TOKEN,
    hasJiraServerIntegration: CODEBASE_CREATION_NAME_HAS_JIRA_INTEGRATION,
    versioningStartFromVersion: CODEBASE_CREATION_NAME_VERSIONING_START_FROM_VERSION,
    versioningStartFromSnapshot: CODEBASE_CREATION_NAME_VERSIONING_START_FROM_SNAPSHOT,
    advancedMappingFieldName: CODEBASE_CREATION_NAME_ADVANCED_MAPPING_FIELD_NAME,
    advancedMappingJiraPattern: CODEBASE_CREATION_NAME_ADVANCED_MAPPING_JIRA_PATTERN,

    // FORM PART CODEBASE INFO
    type: CODEBASE_CREATION_NAME_TYPE,
    strategy: CODEBASE_CREATION_NAME_STRATEGY,
    repositoryUrl: CODEBASE_CREATION_NAME_REPOSITORY_URL,
    gitServer: CODEBASE_CREATION_NAME_GIT_SERVER,
    gitUrlPath: CODEBASE_CREATION_NAME_GIT_URL_PATH,

    // FORM PART LIBRARY INFO
    name: CODEBASE_CREATION_NAME_NAME,
    defaultBranch: CODEBASE_CREATION_NAME_DEFAULT_BRANCH,
    emptyProject: CODEBASE_CREATION_NAME_EMPTY_PROJECT,
    lang: CODEBASE_CREATION_NAME_LANG,
    framework: CODEBASE_CREATION_NAME_FRAMEWORK,
    buildTool: CODEBASE_CREATION_NAME_BUILD_TOOL,

    // FORM PART ADVANCED SETTINGS
    jobProvisioning: CODEBASE_CREATION_NAME_JOB_PROVISIONING,
    jenkinsSlave: CODEBASE_CREATION_NAME_JENKINS_SLAVE,
    versioningType: CODEBASE_CREATION_NAME_VERSIONING_TYPE,
    versioningStartFrom: CODEBASE_CREATION_NAME_VERSIONING_START_FROM,
    deploymentScript: CODEBASE_CREATION_NAME_DEPLOYMENT_SCRIPT,
    ciTool: CODEBASE_CREATION_NAME_CI_TOOL,
    jiraServer: CODEBASE_CREATION_NAME_JIRA_SERVER,
    commitMessagePattern: CODEBASE_CREATION_NAME_COMMIT_MESSAGE_PATTERN,
    ticketNamePattern: CODEBASE_CREATION_NAME_TICKET_NAME_PATTERN,
    jiraIssueMetadataPayload: CODEBASE_CREATION_NAME_JIRA_ISSUE_METADATA_PAYLOAD,
};

export const AUTOTEST_NAMES: { [key: string]: FormNameObject } = {
    // NOT USED IN FORM DATA
    apiVersion: CODEBASE_CREATION_NAME_API_VERSION,
    kind: CODEBASE_CREATION_NAME_KIND,
    hasCodebaseAuth: CODEBASE_CREATION_NAME_HAS_CODEBASE_AUTH,
    repositoryLogin: CODEBASE_CREATION_NAME_REPOSITORY_LOGIN,
    repositoryPasswordOrApiToken: CODEBASE_CREATION_NAME_REPOSITORY_PASSWORD_OR_API_TOKEN,
    hasJiraServerIntegration: CODEBASE_CREATION_NAME_HAS_JIRA_INTEGRATION,
    versioningStartFromVersion: CODEBASE_CREATION_NAME_VERSIONING_START_FROM_VERSION,
    versioningStartFromSnapshot: CODEBASE_CREATION_NAME_VERSIONING_START_FROM_SNAPSHOT,
    advancedMappingFieldName: CODEBASE_CREATION_NAME_ADVANCED_MAPPING_FIELD_NAME,
    advancedMappingJiraPattern: CODEBASE_CREATION_NAME_ADVANCED_MAPPING_JIRA_PATTERN,

    // FORM PART CODEBASE INFO
    type: CODEBASE_CREATION_NAME_TYPE,
    strategy: CODEBASE_CREATION_NAME_STRATEGY,
    repositoryUrl: CODEBASE_CREATION_NAME_REPOSITORY_URL,
    gitServer: CODEBASE_CREATION_NAME_GIT_SERVER,
    gitUrlPath: CODEBASE_CREATION_NAME_GIT_URL_PATH,
    emptyProject: CODEBASE_CREATION_NAME_EMPTY_PROJECT,

    // FORM PART AUTOTEST INFO
    name: CODEBASE_CREATION_NAME_NAME,
    description: CODEBASE_CREATION_NAME_DESCRIPTION,
    defaultBranch: CODEBASE_CREATION_NAME_DEFAULT_BRANCH,
    lang: CODEBASE_CREATION_NAME_LANG,
    framework: CODEBASE_CREATION_NAME_FRAMEWORK,
    buildTool: CODEBASE_CREATION_NAME_BUILD_TOOL,
    testReportFramework: CODEBASE_CREATION_NAME_TEST_REPORT_FRAMEWORK,

    // FORM PART ADVANCED SETTINGS
    jobProvisioning: CODEBASE_CREATION_NAME_JOB_PROVISIONING,
    jenkinsSlave: CODEBASE_CREATION_NAME_JENKINS_SLAVE,
    versioningType: CODEBASE_CREATION_NAME_VERSIONING_TYPE,
    versioningStartFrom: CODEBASE_CREATION_NAME_VERSIONING_START_FROM,
    ciTool: CODEBASE_CREATION_NAME_CI_TOOL,
    jiraServer: CODEBASE_CREATION_NAME_JIRA_SERVER,
    commitMessagePattern: CODEBASE_CREATION_NAME_COMMIT_MESSAGE_PATTERN,
    ticketNamePattern: CODEBASE_CREATION_NAME_TICKET_NAME_PATTERN,
    jiraIssueMetadataPayload: CODEBASE_CREATION_NAME_JIRA_ISSUE_METADATA_PAYLOAD,
};
