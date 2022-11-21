import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { ApplicationKubeObjectConfig } from '../../../../k8s/Application/config';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';

const { kind, group, version } = ApplicationKubeObjectConfig;

interface createApplicationInstanceProps {
    pipelineName: string;
    stageName: string;
    appName: string;
    imageName: string;
    imageTag: string;
    port: number;
    namespace: string;
    versioningType: string;
}

export const createApplicationInstance = ({
    pipelineName,
    stageName,
    appName,
    imageName,
    imageTag,
    port,
    namespace,
    versioningType,
}: createApplicationInstanceProps): ApplicationKubeObjectInterface => {
    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES['EDP'];

    return {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: `${pipelineName}-${stageName}-${appName}-${createRandomFiveSymbolString()}`,
            namespace,
        },
        spec: {
            project: namespace,
            destination: {
                namespace: `${namespace}-${pipelineName}-${stageName}`,
                server: 'https://kubernetes.default.svc',
            },
            source: {
                helm: {
                    parameters: [
                        {
                            name: 'image.tag',
                            value: imageTag,
                        },
                        {
                            name: 'image.repository',
                            value: imageName,
                        },
                    ],
                },
                path: 'deploy-templates',
                repoURL: `ssh://argocd@gerrit.${namespace}:${port}/${appName}.git`,
                targetRevision: isEDPVersioning ? `build/${imageTag}` : imageTag,
            },
            syncPolicy: {
                syncOptions: ['CreateNamespace=true'],
                automated: {
                    selfHeal: true,
                    prune: true,
                },
            },
        },
    };
};
