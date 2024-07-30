import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../../../configs/codebase-mappings';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../constants/codebaseVersioningTypes';
import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { CDPipelineKubeObjectInterface } from '../../../../EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseImageStreamKubeObjectInterface } from '../../../../EDP/CodebaseImageStream/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../../EDP/Stage/types';
import { ApplicationKubeObjectInterface } from '../../types';

export const editApplicationInstance = ({
  CDPipeline,
  currentCDPipelineStage,
  argoApplication,
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
  argoApplication: ApplicationKubeObjectInterface;
  imageStream: CodebaseImageStreamKubeObjectInterface;
  imageTag: string;
  gitServer: GitServerKubeObjectInterface;
  valuesOverride: boolean;
  gitOpsCodebase: CodebaseKubeObjectInterface;
}): ApplicationKubeObjectInterface => {
  const {
    metadata: { name: pipelineName },
  } = CDPipeline;

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
    spec: { name: stageName },
  } = currentCDPipelineStage;

  const {
    spec: { imageName },
  } = imageStream;

  const {
    spec: { gitHost, sshPort, gitProvider },
  } = gitServer;

  const base = { ...argoApplication };

  const isEDPVersioning = versioningType === CODEBASE_VERSIONING_TYPES.EDP;
  const repoUrlUser = gitProvider === GIT_PROVIDERS.GERRIT ? 'argocd' : 'git';
  const valuesRepoURL = `ssh://${repoUrlUser}@${gitHost}:${sshPort}${gitOpsCodebase.spec.gitUrlPath}`;
  const repoURL = `ssh://${repoUrlUser}@${gitHost}:${sshPort}${gitUrlPath}`;
  const targetRevision = isEDPVersioning ? `build/${imageTag}` : imageTag;
  const isHelmApp =
    lang === CODEBASE_COMMON_LANGUAGES.HELM &&
    framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
    buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

  const newSource = {
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
  };

  delete base.spec.source;
  // @ts-ignore
  delete base.spec.sources;

  base.spec = {
    ...base.spec,
    ...newSource,
  };

  return base;
};
