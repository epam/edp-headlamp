import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/PipelineRun/config';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

interface createBuildPipelineRunInstanceProps {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseType: string;
        codebaseFramework: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
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
    storageSize: string;
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

interface createAutotestRunnerPipelineRunInstanceProps {
    namespace: string;
    stageName: string;
    CDPipelineName: string;
    storageSize: string;
    randomPostfix: string;
}

export const createBuildPipelineRunInstance = ({
    namespace,
    codebaseData: {
        codebaseName,
        codebaseBuildTool,
        codebaseVersioningType,
        codebaseType,
        codebaseFramework,
        codebaseGitUrlPath,
    },
    codebaseBranchData: { codebaseBranchMetadataName, codebaseBranchName },
    gitServerData: { gitUser, gitHost, gitProvider, sshPort, nameSshKeySecret },
    storageSize,
    randomPostfix,
}: createBuildPipelineRunInstanceProps): PipelineRunKubeObjectInterface => {
    const truncatedCodebaseType = codebaseType.slice(0, 3);
    const normalizedCodebaseBranchName = codebaseBranchName.replaceAll('/', '-');

    const base: any = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            namespace,
            name: `${codebaseName}-${normalizedCodebaseBranchName}-build-${randomPostfix}`,
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
                    value: `ssh://${gitUser}@${gitHost}:${sshPort}${codebaseGitUrlPath}`,
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
                                    storage: storageSize,
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
                'app.edp.epam.com/pipeline': `${CDPipelineName}-${stageName}`,
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

export const createAutotestRunnerPipelineRunInstance = ({
    namespace,
    stageName,
    CDPipelineName,
    storageSize,
    randomPostfix,
}: createAutotestRunnerPipelineRunInstanceProps): PipelineRunKubeObjectInterface => {
    return {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            // @ts-ignore
            generateName: `${CDPipelineName}-${stageName}-${randomPostfix}`,
            namespace,
            labels: {
                'app.edp.epam.com/pipelinetype': 'autotestRunner',
                'app.edp.epam.com/stage': stageName,
                'app.edp.epam.com/pipeline': CDPipelineName,
            },
        },
        spec: {
            pipelineRef: {
                name: 'autotest-runner',
            },
            params: [
                {
                    name: 'cd-pipeline-name',
                    value: CDPipelineName,
                },
                {
                    name: 'stage-name',
                    value: stageName,
                },
            ],
            serviceAccountName: 'tekton',
            workspaces: [
                {
                    name: 'shared-workspace',
                    volumeClaimTemplate: {
                        spec: {
                            accessModes: ['ReadWriteOnce'],
                            resources: {
                                requests: {
                                    storage: storageSize,
                                },
                            },
                            volumeMode: 'Filesystem',
                        },
                    },
                },
            ],
        },
    };
};
