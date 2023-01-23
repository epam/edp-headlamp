import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { GIT_SERVERS } from '../../../../constants/gitServers';
import { ApplicationKubeObjectConfig } from '../../../../k8s/Application/config';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import { createApplicationInstanceProps, editApplicationInstanceProps } from './types';

const { kind, group, version } = ApplicationKubeObjectConfig;

export const createApplicationInstance = ({
    CDPipeline,
    currentCDPipelineStage,
    enrichedApplication,
    imageStream,
    imageTag,
    gitServer,
}: createApplicationInstanceProps): ApplicationKubeObjectInterface => {
    const randomPostfix = createRandomFiveSymbolString();
    const {
        metadata: { namespace, name: pipelineName },
    } = CDPipeline;

    const {
        spec: { name: stageName },
    } = currentCDPipelineStage;

    const {
        application: {
            metadata: { name: appName },
            spec: {
                versioning: { type: versioningType },
                gitUrlPath,
                strategy,
            },
        },
    } = enrichedApplication;

    const {
        spec: { imageName },
    } = imageStream;

    const {
        spec: { gitProvider, gitHost, sshPort },
    } = gitServer;

    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES['EDP'];

    const repoUrlPath = gitProvider === GIT_SERVERS['GERRIT'] ? `/${appName}` : gitUrlPath;
    const repoUrlUser = strategy === CODEBASE_CREATION_STRATEGIES['IMPORT'] ? 'git' : 'argocd';

    return {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: `${appName}-${randomPostfix}`,
            namespace,
            labels: {
                'app.edp.epam.com/stage': stageName,
                'app.edp.epam.com/pipeline': pipelineName,
                'app.edp.epam.com/app-name': appName,
            },
            finalizers: ['resources-finalizer.argocd.argoproj.io'],
            ownerReferences: [
                {
                    apiVersion: currentCDPipelineStage.apiVersion,
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: currentCDPipelineStage.kind,
                    name: currentCDPipelineStage.metadata.name,
                    uid: currentCDPipelineStage.metadata.uid,
                },
            ],
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
                repoURL: `ssh://${repoUrlUser}@${gitHost}:${sshPort}${repoUrlPath}`,
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
    enrichedApplication,
    imageTag,
}: editApplicationInstanceProps): ApplicationKubeObjectInterface => {
    const {
        application: {
            spec: {
                versioning: { type: versioningType },
            },
        },
    } = enrichedApplication;
    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES['EDP'];
    const base = { ...argoApplication };

    const newParameters = base.spec.source.helm.parameters.map(el => {
        if (el.name === 'image.tag') {
            return {
                ...el,
                value: imageTag,
            };
        }

        return el;
    });

    const newTargetRevision = isEDPVersioning ? `build/${imageTag}` : imageTag;

    base.spec.source.helm.parameters = newParameters;
    base.spec.source.targetRevision = newTargetRevision;

    return base;
};
