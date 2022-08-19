import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { DeepPartial } from '../../../../types/global';

export const cloneStrategyCodebaseDataMock: DeepPartial<EDPCodebaseKubeObjectInterface> = {
    apiVersion: 'v2.edp.epam.com/v1',
    kind: 'Codebase',
    spec: {
        type: 'application',
        strategy: 'clone',
        gitServer: 'gerrit',
        ciTool: 'jenkins',
        emptyProject: false,
        deploymentScript: 'helm-chart',
        jenkinsSlave: 'go',
        repository: {
            url: 'https://github.com/epam/edp-gerrit-operator.git',
        },
        defaultBranch: 'master',
        lang: 'Go',
        framework: 'operator-sdk',
        jobProvisioning: 'github',
        versioning: {
            type: 'default',
        },
        buildTool: 'go',
    },
    metadata: {
        name: 'test-edp-gerrit-operator',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
};

export const cloneStrategyCodebaseAuthDataMock = {
    repositoryLogin: 'login',
    repositoryPasswordOrApiToken: 'password',
};

export const cloneStrategySecret = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
        name: 'repository-codebase-test-edp-gerrit-operator-temp',
        namespace: 'edp-delivery-vp-delivery-dev',
    },
    data: {
        username: 'bG9naW4=',
        password: 'cGFzc3dvcmQ=',
    },
};
