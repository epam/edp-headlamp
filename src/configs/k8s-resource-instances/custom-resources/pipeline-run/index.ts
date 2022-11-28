import { PipelineRunKubeObjectConfig } from '../../../../k8s/PipelineRun/config';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/PipelineRun/types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

interface createPipelineRunInstanceProps {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
        codebaseType: string;
        codebaseFramework: string;
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

export const createPipelineRunInstance = ({
    namespace,
    codebaseData: {
        codebaseName,
        codebaseBuildTool,
        codebaseVersioningType,
        codebaseType,
        codebaseFramework,
    },
    codebaseBranchData: { codebaseBranchMetadataName, codebaseBranchName },
    gitServerData: { gitUser, gitHost, gitProvider, sshPort, nameSshKeySecret },
    randomPostfix,
}: createPipelineRunInstanceProps): PipelineRunKubeObjectInterface => {
    const truncatedCodebaseType = codebaseType.slice(0, 3);

    return {
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
                    value: `ssh://${gitUser}@${gitHost}:${sshPort}/${codebaseName}`,
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
                {
                    name: 'changeNumber',
                    value: '1',
                },
                {
                    name: 'patchsetNumber',
                    value: '1',
                },
            ],
            pipelineRef: {
                name: `${gitProvider}-${codebaseBuildTool}-${codebaseFramework}-${truncatedCodebaseType}-build-${codebaseVersioningType}`,
            },
            serviceAccountName: 'tekton',
            taskRunSpecs: [
                {
                    pipelineTaskName: 'create-ecr-repository',
                    taskServiceAccountName: 'edp-kaniko',
                },
                {
                    pipelineTaskName: 'kaniko-build',
                    taskServiceAccountName: 'edp-kaniko',
                },
            ],
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
};
