import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../EDPCodebase/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../EDPCodebaseImageStream/types';
import { gitServerGithubMock } from '../../../EDPGitServer/mocks/gitServer.mock';
import { EDPGitServerKubeObjectInterface } from '../../../EDPGitServer/types';
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
      CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
      currentCDPipelineStage:
        CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as EDPCodebaseKubeObjectInterface,
      imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as EDPGitServerKubeObjectInterface,
      valuesOverride: false,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as EDPCodebaseKubeObjectInterface,
      argoApplication:
        enrichedApplicationMock.argoApplication as unknown as ApplicationKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationAfterEditOutputMock);
  });

  it('should return valid kube object with values override', () => {
    const object = editApplicationInstance({
      CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
      currentCDPipelineStage:
        CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as EDPCodebaseKubeObjectInterface,
      imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as EDPGitServerKubeObjectInterface,
      valuesOverride: true,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as EDPCodebaseKubeObjectInterface,
      argoApplication:
        enrichedApplicationMock.argoApplication as unknown as ApplicationKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationAfterEditOutputMockWithValuesOverride);
  });
});
