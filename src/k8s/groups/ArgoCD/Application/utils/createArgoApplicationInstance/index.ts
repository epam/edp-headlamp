import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../../../configs/codebase-mappings';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../constants/codebaseVersioningTypes';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { createRandomString } from '../../../../../../utils/createRandomString';
import { CDPipelineKubeObjectInterface } from '../../../../EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseImageStreamKubeObjectInterface } from '../../../../EDP/CodebaseImageStream/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../../EDP/Stage/types';
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
  valuesOverride,
  gitOpsCodebase,
}: {
  CDPipeline: CDPipelineKubeObjectInterface;
  currentCDPipelineStage: StageKubeObjectInterface;
  application: CodebaseKubeObjectInterface;
  imageStream: CodebaseImageStreamKubeObjectInterface;
  imageTag: string;
  gitServer: GitServerKubeObjectInterface;
  valuesOverride: boolean;
  gitOpsCodebase: CodebaseKubeObjectInterface;
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

  const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES.EDP;
  const repoUrlUser = gitProvider === GIT_PROVIDERS.GERRIT ? 'argocd' : 'git';
  const valuesRepoURL = `ssh://${repoUrlUser}@${gitHost}:${sshPort}${gitOpsCodebase.spec.gitUrlPath}`;
  const repoURL = `ssh://${repoUrlUser}@${gitHost}:${sshPort}${gitUrlPath}`;
  const targetRevision = isEDPVersioning ? `build/${imageTag}` : imageTag;

  const isHelmApp =
    lang === CODEBASE_COMMON_LANGUAGES.HELM &&
    framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
    buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

  return {
    apiVersion: `${group}/${version}`,
    kind,
    // @ts-ignore
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
    // @ts-ignore
    spec: {
      project: namespace,
      destination: {
        namespace: currentCDPipelineStage.spec.namespace,
        name: currentCDPipelineStage.spec.clusterName,
      },
      ...(valuesOverride
        ? {
            sources: [
              {
                repoURL: valuesRepoURL,
                targetRevision: 'main',
                ref: 'values',
              },
              {
                helm: {
                  valueFiles: [`$values/${pipelineName}/${stageName}/${appName}-values.yaml`],
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
                  releaseName: appName,
                },
                path: 'deploy-templates',
                repoURL: repoURL,
                targetRevision: targetRevision,
              },
            ],
          }
        : {
            source: {
              helm: {
                releaseName: appName,
                parameters: [
                  ...(isHelmApp
                    ? []
                    : [
                        {
                          name: 'image.tag',
                          value: imageTag,
                        },
                        {
                          name: 'image.repository',
                          value: imageName,
                        },
                      ]),
                ],
              },
              path: 'deploy-templates',
              repoURL: repoURL,
              targetRevision: targetRevision,
            },
          }),
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
