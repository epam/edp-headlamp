import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../EDPCodebase/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../EDPGitServer/types';
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
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    application: EDPCodebaseKubeObjectInterface;
    argoApplication: ApplicationKubeObjectInterface;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
    gitServer: EDPGitServerKubeObjectInterface;
    valuesOverride: boolean;
    gitOpsCodebase: EDPCodebaseKubeObjectInterface;
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
                              valueFiles: [
                                  `$values/${pipelineName}/${stageName}/${appName}-values.yaml`,
                              ],
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
