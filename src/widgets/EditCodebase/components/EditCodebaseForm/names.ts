import { FormNameObject } from '../../../../types/forms';

export const CODEBASE_EDIT_NAME_ADVANCED_MAPPING_FIELD_NAME: FormNameObject = {
    name: 'advancedMappingFieldName',
    notUsedInFormData: true,
};

export const CODEBASE_EDIT_NAME_ADVANCED_MAPPING_JIRA_PATTERN: FormNameObject = {
    name: 'advancedMappingJiraPattern',
    notUsedInFormData: true,
};

export const CODEBASE_EDIT_NAME_HAS_JIRA_INTEGRATION: FormNameObject = {
    name: 'hasJiraServerIntegration',
    notUsedInFormData: true,
};

export const CODEBASE_EDIT_NAME_JIRA_SERVER: FormNameObject = {
    name: 'jiraServer',
    path: ['spec', 'jiraServer'],
};

export const CODEBASE_EDIT_NAME_COMMIT_MESSAGE_PATTERN: FormNameObject = {
    name: 'commitMessagePattern',
    path: ['spec', 'commitMessagePattern'],
};

export const CODEBASE_EDIT_NAME_TICKET_NAME_PATTERN: FormNameObject = {
    name: 'ticketNamePattern',
    path: ['spec', 'ticketNamePattern'],
};

export const CODEBASE_EDIT_NAME_JIRA_ISSUE_METADATA_PAYLOAD: FormNameObject = {
    name: 'jiraIssueMetadataPayload',
    path: ['spec', 'jiraIssueMetadataPayload'],
};

export const CODEBASE_EDIT_NAME_NAMESPACE: FormNameObject = {
    name: 'namespace',
    path: ['metadata', 'namespace'],
};

export const CODEBASE_EDIT_NAMES: { [key: string]: FormNameObject } = {
    jiraServer: CODEBASE_EDIT_NAME_JIRA_SERVER,
    commitMessagePattern: CODEBASE_EDIT_NAME_COMMIT_MESSAGE_PATTERN,
    ticketNamePattern: CODEBASE_EDIT_NAME_TICKET_NAME_PATTERN,
    jiraIssueMetadataPayload: CODEBASE_EDIT_NAME_JIRA_ISSUE_METADATA_PAYLOAD,
    hasJiraServerIntegration: CODEBASE_EDIT_NAME_HAS_JIRA_INTEGRATION,
    advancedMappingFieldName: CODEBASE_EDIT_NAME_ADVANCED_MAPPING_FIELD_NAME,
    advancedMappingJiraPattern: CODEBASE_EDIT_NAME_ADVANCED_MAPPING_JIRA_PATTERN,
    namespace: CODEBASE_EDIT_NAME_NAMESPACE,
};
