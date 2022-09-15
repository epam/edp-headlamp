import { DeepPartial } from '../../../types/global';
import { EDPKubeObjectInterface } from '../../../types/k8s';

export const jiraServersMock: DeepPartial<EDPKubeObjectInterface> = {
    items: [
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'JiraServer',
            metadata: {
                name: 'jira-server-1',
            },
        },
        {
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'JiraServer',
            metadata: {
                name: 'jira-server-2',
            },
        },
    ],
};
