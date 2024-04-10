/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../EDPCodebase/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../EDPCodebaseImageStream/types';
import { gitServerGithubMock } from '../../../EDPGitServer/mocks/gitServer.mock';
import { EDPGitServerKubeObjectInterface } from '../../../EDPGitServer/types';
import {
  expectedApplicationOutputMock,
  expectedApplicationOutputMockWithValuesOverride,
} from '../../mocks/application.mock';
import { CDPipelineMock } from '../../mocks/CDPipeline.mock';
import { CDPipelineStageMock } from '../../mocks/CDPipelineStage.mock';
import { enrichedApplicationMock } from '../../mocks/enrichedApplication.mock';
import { gitOpsCodebaseMock } from '../../mocks/gitOpsCodebase.mock';
import { imageStreamMock } from '../../mocks/imageStream.mock';
import { createArgoApplicationInstance } from './index';

beforeEach(() => {
  jest
    .spyOn(global.window.crypto, 'getRandomValues')
    .mockReturnValue(new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584]));
});

afterEach(() => {
  jest.clearAllMocks();
  jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createApplicationInstance', () => {
  it('should return valid kube object', () => {
    const object = createArgoApplicationInstance({
      CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
      currentCDPipelineStage:
        CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as EDPCodebaseKubeObjectInterface,
      imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as EDPGitServerKubeObjectInterface,
      valuesOverride: false,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as EDPCodebaseKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationOutputMock);
  });

  it('should return valid kube object with values override', () => {
    const object = createArgoApplicationInstance({
      CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
      currentCDPipelineStage:
        CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as EDPCodebaseKubeObjectInterface,
      imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as EDPGitServerKubeObjectInterface,
      valuesOverride: true,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as EDPCodebaseKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationOutputMockWithValuesOverride);
  });
});
