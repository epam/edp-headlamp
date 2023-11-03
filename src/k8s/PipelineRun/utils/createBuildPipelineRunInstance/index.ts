import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { createRandomString } from '../../../../utils/createRandomString';
import { PipelineRunKubeObjectConfig } from '../../config';
import { PipelineRunKubeObjectInterface } from '../../types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

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
}: {
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
}): PipelineRunKubeObjectInterface => {
    const truncatedCodebaseType = codebaseType.slice(0, 3);
    const normalizedCodebaseBranchName = codebaseBranchName
        .replaceAll('/', '-')
        .replaceAll('.', '-');
    const trimmedPipelineRunNameStartValue =
        `${codebaseName}-${normalizedCodebaseBranchName}`.slice(0, 33); // 33 max length for name before random postfix

    const base: any = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            namespace,
            name: `${trimmedPipelineRunNameStartValue}-build-${createRandomString(4)}`,
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
