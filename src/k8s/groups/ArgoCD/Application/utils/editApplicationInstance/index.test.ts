import { CDPipelineKubeObjectInterface } from '../../../../EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseImageStreamKubeObjectInterface } from '../../../../EDP/CodebaseImageStream/types';
import { gitServerGithubMock } from '../../../../EDP/GitServer/mocks/gitServer.mock';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../../EDP/Stage/types';
import {
  expectedApplicationAfterEditOutputMock,
  expectedApplicationAfterEditOutputMockWithValuesOverride,
} from '../../mocks/application.mock';
import { CDPipelineMock } from '../../mocks/CDPipeline.mock';
import { CDPipelineStageMock } from '../../mocks/CDPipelineStage.mock';
import { enrichedApplicationMock } from '../../mocks/enrichedApplication.mock';
import { gitOpsCodebaseMock } from '../../mocks/gitOpsCodebase.mock';
import { imageStreamMock } from '../../mocks/imageStream.mock';
import { ApplicationKubeObjectInterface } from '../../types';
import { editApplicationInstance } from './index';

describe('testing editApplicationInstance', () => {
  it('should return valid kube object', () => {
    const object = editApplicationInstance({
      CDPipeline: CDPipelineMock as CDPipelineKubeObjectInterface,
      currentCDPipelineStage: CDPipelineStageMock as unknown as StageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as CodebaseKubeObjectInterface,
      imageStream: imageStreamMock as CodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as GitServerKubeObjectInterface,
      valuesOverride: false,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as CodebaseKubeObjectInterface,
      argoApplication:
        enrichedApplicationMock.argoApplication as unknown as ApplicationKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationAfterEditOutputMock);
  });

  it('should return valid kube object with values override', () => {
    const object = editApplicationInstance({
      CDPipeline: CDPipelineMock as CDPipelineKubeObjectInterface,
      currentCDPipelineStage: CDPipelineStageMock as unknown as StageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as CodebaseKubeObjectInterface,
      imageStream: imageStreamMock as CodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as GitServerKubeObjectInterface,
      valuesOverride: true,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as CodebaseKubeObjectInterface,
      argoApplication:
        enrichedApplicationMock.argoApplication as unknown as ApplicationKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationAfterEditOutputMockWithValuesOverride);
  });
});
