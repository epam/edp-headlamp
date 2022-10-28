import { ArgoApplicationKubeObjectConfig } from '../../../../k8s/ArgoApplication/config';
import { ArgoApplicationKubeObjectInterface } from '../../../../k8s/ArgoApplication/types';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';

const { kind, group, version } = ArgoApplicationKubeObjectConfig;

export const createArgoApplicationInstance = ({
    pipelineName,
    stageName,
    appName,
    imageName,
    imageTag,
    port,
    namespace,
}): ArgoApplicationKubeObjectInterface => {
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
                repoURL: `ssh://admin@gerrit.${namespace}:${port}/${appName}.git`,
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
