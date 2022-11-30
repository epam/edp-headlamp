import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { ApplicationKubeObjectConfig } from '../../../../k8s/Application/config';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { createApplicationInstanceProps, editApplicationInstanceProps } from './types';

const { kind, group, version } = ApplicationKubeObjectConfig;

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
            name: `${pipelineName}-${stageName}-${appName}`,
            namespace,
            labels: {
                'app.edp.epam.com/pipeline-stage': `${pipelineName}-${stageName}`,
                'app.edp.epam.com/pipeline': pipelineName,
                'app.edp.epam.com/app-name': appName,
            },
            finalizers: ['resources-finalizer.argocd.argoproj.io'],
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

export const editApplicationInstance = ({
    argoApplication,
    versioningType,
    deployedVersion,
}: editApplicationInstanceProps): ApplicationKubeObjectInterface => {
    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES['EDP'];
    const base = { ...argoApplication };

    const newParameters = base.spec.source.helm.parameters.map(el => {
        if (el.name === 'image.tag') {
            return {
                ...el,
                value: deployedVersion,
            };
        }

        return el;
    });

    const newTargetRevision = isEDPVersioning ? `build/${deployedVersion}` : deployedVersion;

    base.spec.source.helm.parameters = newParameters;
    base.spec.source.targetRevision = newTargetRevision;

    return base;
};
