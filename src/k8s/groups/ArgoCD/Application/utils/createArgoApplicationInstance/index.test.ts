/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { CDPipelineKubeObjectInterface } from '../../../../EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseImageStreamKubeObjectInterface } from '../../../../EDP/CodebaseImageStream/types';
import { gitServerGithubMock } from '../../../../EDP/GitServer/mocks/gitServer.mock';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../../EDP/Stage/types';
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
      CDPipeline: CDPipelineMock as CDPipelineKubeObjectInterface,
      currentCDPipelineStage: CDPipelineStageMock as unknown as StageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as CodebaseKubeObjectInterface,
      imageStream: imageStreamMock as CodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as GitServerKubeObjectInterface,
      valuesOverride: false,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as CodebaseKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationOutputMock);
  });

  it('should return valid kube object with values override', () => {
    const object = createArgoApplicationInstance({
      CDPipeline: CDPipelineMock as CDPipelineKubeObjectInterface,
      currentCDPipelineStage: CDPipelineStageMock as unknown as StageKubeObjectInterface,
      application: enrichedApplicationMock.application as unknown as CodebaseKubeObjectInterface,
      imageStream: imageStreamMock as CodebaseImageStreamKubeObjectInterface,
      imageTag: 'test-image-tag',
      gitServer: gitServerGithubMock as GitServerKubeObjectInterface,
      valuesOverride: true,
      gitOpsCodebase: gitOpsCodebaseMock as unknown as CodebaseKubeObjectInterface,
    });

    expect(object).toEqual(expectedApplicationOutputMockWithValuesOverride);
  });
});
