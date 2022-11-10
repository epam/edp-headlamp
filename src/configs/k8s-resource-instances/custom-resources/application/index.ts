import { ApplicationKubeObjectConfig } from '../../../../k8s/Application/config';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';

const { kind, group, version } = ApplicationKubeObjectConfig;

export const createApplicationInstance = ({
    pipelineName,
    stageName,
    appName,
    imageName,
    imageTag,
    port,
    namespace,
}): ApplicationKubeObjectInterface => {
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
                targetRevision: imageTag,
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
