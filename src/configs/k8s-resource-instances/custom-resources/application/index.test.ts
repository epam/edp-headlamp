/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithImageStreams } from '../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../k8s/EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { createApplicationInstance } from './index';
import { expectedApplicationOutputMock } from './mocks/application.mock';
import { CDPipelineMock } from './mocks/CDPipeline.mock';
import { CDPipelineStageMock } from './mocks/CDPipelineStage.mock';
import { enrichedApplicationMock } from './mocks/enrichedApplication.mock';
import { gitServerMock } from './mocks/gitServer.mock';
import { imageStreamMock } from './mocks/imageStream.mock';

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createApplicationInstance', () => {
    it('should return valid kube object', () => {
        const object = createApplicationInstance({
            CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
            currentCDPipelineStage:
                CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
            enrichedApplication:
                enrichedApplicationMock as unknown as EnrichedApplicationWithImageStreams,
            imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
            imageTag: 'test-image-tag',
            gitServer: gitServerMock as EDPGitServerKubeObjectInterface,
        });

        expect(object).toEqual(expectedApplicationOutputMock);
    });
});
