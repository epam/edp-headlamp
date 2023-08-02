import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { createRandomString } from '../../../../utils/createRandomString';
import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../EDPCodebase/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../EDPGitServer/types';
import { ApplicationKubeObjectConfig } from '../../config';
import { ApplicationKubeObjectInterface } from '../../types';

const { kind, group, version } = ApplicationKubeObjectConfig;

export const createArgoApplicationInstance = ({
    CDPipeline,
    currentCDPipelineStage,
    application,
    imageStream,
    imageTag,
    gitServer,
}: {
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    application: EDPCodebaseKubeObjectInterface;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
    gitServer: EDPGitServerKubeObjectInterface;
}): ApplicationKubeObjectInterface => {
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
            name: `${appName}-${createRandomString()}`,
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
                name: currentCDPipelineStage.spec.clusterName,
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