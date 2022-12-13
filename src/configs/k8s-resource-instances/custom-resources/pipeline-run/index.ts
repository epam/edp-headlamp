import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/PipelineRun/config';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

interface createBuildPipelineRunInstanceProps {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseType: string;
        codebaseLanguage: string;
        codebaseFramework: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
        codebaseStrategy: string;
        codebaseGitUrlPath: string;
    };
    codebaseBranchData: {
        codebaseBranchMetadataName: string;
        codebaseBranchName: string;
    };
    gitServerData: {
        gitUser: string;
        gitHost: string;
        gitProvider: string;
        sshPort: number;
        nameSshKeySecret: string;
    };
    randomPostfix: string;
}

interface createDeployPipelineRunInstanceProps {
    namespace: string;
    pipelineName: string;
    stageName: string;
    CDPipelineName: string;
    randomPostfix: string;
    codebaseTag: string;
}

export const createBuildPipelineRunInstance = ({
    namespace,
    codebaseData: {
        codebaseName,
        codebaseLanguage,
        codebaseBuildTool,
        codebaseVersioningType,
        codebaseType,
        codebaseFramework,
        codebaseStrategy,
        codebaseGitUrlPath,
    },
    codebaseBranchData: { codebaseBranchMetadataName, codebaseBranchName },
    gitServerData: { gitUser, gitHost, gitProvider, sshPort, nameSshKeySecret },
    randomPostfix,
}: createBuildPipelineRunInstanceProps): PipelineRunKubeObjectInterface => {
    const truncatedCodebaseType = codebaseType.slice(0, 3);

    const base: any = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            namespace,
            name: `${codebaseName}-build-${randomPostfix}`,
            labels: {
                'app.edp.epam.com/codebasebranch': codebaseBranchMetadataName,
                'app.edp.epam.com/codebase': codebaseName,
                'app.edp.epam.com/pipelinetype': 'build',
            },
        },
        spec: {
            params: [
                {
                    name: 'git-source-url',
                    value: `ssh://${gitUser}@${gitHost}:${sshPort}${
                        codebaseStrategy === CODEBASE_CREATION_STRATEGIES['IMPORT']
                            ? codebaseGitUrlPath
                            : `/${codebaseName}`
                    }`,
                },
                {
                    name: 'git-source-revision',
                    value: codebaseBranchName,
                },
                {
                    name: 'CODEBASEBRANCH_NAME',
                    value: codebaseBranchMetadataName,
                },
                {
                    name: 'CODEBASE_NAME',
                    value: codebaseName,
                },
            ],
            pipelineRef: {
                name: `${gitProvider}-${codebaseBuildTool}-${codebaseFramework}-${truncatedCodebaseType}-build-${codebaseVersioningType}`,
            },
            serviceAccountName: 'tekton',
            timeout: '1h0m0s',
            workspaces: [
                {
                    name: 'settings',
                    configMap: {
                        name: `custom-${codebaseBuildTool}-settings`,
                    },
                },
                {
                    name: 'shared-workspace',
                    subPath: 'codebase',
                    volumeClaimTemplate: {
                        metadata: {
                            creationTimestamp: null,
                        },
                        spec: {
                            accessModes: ['ReadWriteOnce'],
                            resources: {
                                requests: {
                                    storage: '1Gi',
                                },
                            },
                        },
                        status: {},
                    },
                },
                {
                    name: 'ssh-creds',
                    secret: {
                        secretName: nameSshKeySecret,
                    },
                },
            ],
        },
    };

    if (gitProvider === GIT_PROVIDERS['GERRIT']) {
        base.spec.params.push({
            name: 'changeNumber',
            value: '1',
        });
        base.spec.params.push({
            name: 'patchsetNumber',
            value: '1',
        });
    }

    if (
        codebaseType === CODEBASE_TYPES['APPLICATION'] ||
        (codebaseType === CODEBASE_TYPES['LIBRARY'] &&
            codebaseLanguage === 'container' &&
            codebaseFramework === 'docker' &&
            codebaseBuildTool === 'kaniko')
    ) {
        base.spec.taskRunSpecs = [
            {
                pipelineTaskName: 'create-ecr-repository',
                taskServiceAccountName: 'edp-kaniko',
            },
            {
                pipelineTaskName: 'kaniko-build',
                taskServiceAccountName: 'edp-kaniko',
            },
        ];
    }
    return base;
};

export const createDeployPipelineRunInstance = ({
    namespace,
    pipelineName,
    stageName,
    CDPipelineName,
    randomPostfix,
    codebaseTag,
}: createDeployPipelineRunInstanceProps): PipelineRunKubeObjectInterface => {
    return {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            namespace,
            name: `${CDPipelineName}-${stageName}-${randomPostfix}`,
            labels: {
                'app.edp.epam.com/pipelinename': `${CDPipelineName}-${stageName}`,
                'app.edp.epam.com/pipelinetype': 'deploy',
            },
        },
        spec: {
            serviceAccountName: 'tekton',
            params: [
                {
                    name: 'CODEBASE_TAG',
                    value: codebaseTag,
                },
                {
                    name: 'CDPIPELINE_CR',
                    value: CDPipelineName,
                },
                {
                    name: 'CDPIPELINE_STAGE',
                    value: stageName,
                },
            ],
            pipelineRef: {
                name: pipelineName,
            },
        },
    };
};
