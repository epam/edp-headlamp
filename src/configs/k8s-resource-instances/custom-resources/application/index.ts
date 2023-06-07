import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { ApplicationKubeObjectConfig } from '../../../../k8s/Application/config';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { createRandomFiveSymbolString } from '../../../../utils/createRandomFiveSymbolString';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../codebase-mappings';
import { createApplicationInstanceProps, editApplicationInstanceProps } from './types';

const { kind, group, version } = ApplicationKubeObjectConfig;

export const createArgoApplicationInstance = ({
    CDPipeline,
    currentCDPipelineStage,
    application,
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
        metadata: { name: appName },
        spec: {
            versioning: { type: versioningType },
            gitUrlPath,
            lang,
            framework,
            buildTool,
        },
    } = application;

    const {
        spec: { imageName },
    } = imageStream;

    const {
        spec: { gitHost, sshPort, gitProvider },
    } = gitServer;

    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES['EDP'];
    const repoUrlUser = gitProvider === GIT_PROVIDERS.GERRIT ? 'argocd' : 'git';

    const base: ApplicationKubeObjectInterface = {
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
            // @ts-ignore
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
                    releaseName: appName,
                    parameters: [],
                },
                path: 'deploy-templates',
                repoURL: `ssh://${repoUrlUser}@${gitHost}:${sshPort}${gitUrlPath}`,
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

    if (
        lang === CODEBASE_COMMON_LANGUAGES.HELM &&
        framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
        buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM
    ) {
        return base;
    }

    base.spec.source.helm.parameters = [
        ...base.spec.source.helm.parameters,
        {
            name: 'image.tag',
            value: imageTag,
        },
        {
            name: 'image.repository',
            value: imageName,
        },
    ];

    return base;
};

export const editApplicationInstance = ({
    argoApplication,
    application,
    imageTag,
}: editApplicationInstanceProps): ApplicationKubeObjectInterface => {
    const {
        spec: {
            versioning: { type: versioningType },
        },
    } = application;
    const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES.EDP;
    const base = { ...argoApplication };

    const newParameters = base.spec.source.helm?.parameters?.map(el => {
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
