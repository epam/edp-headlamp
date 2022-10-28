/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks';
import { EnrichedApplication } from '../../../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { useImageStreamBasedOnResources } from './index';
import { applicationMock } from './mocks/application.mock';
import { cdpipelineMock } from './mocks/cdpipeline.mock';
import { stageMock } from './mocks/stage.mock';
import { stagesMock } from './mocks/stages.mock';

describe('testing useImageStreamBasedOnResources hook', () => {
    it('should return image stream based on resources', async () => {
        const {
            result: {
                current: { imageStream },
            },
        } = renderHook(() =>
            useImageStreamBasedOnResources({
                application: applicationMock as EnrichedApplication,
                CDPipeline: cdpipelineMock as EDPCDPipelineKubeObjectInterface,
                currentCDPipelineStage: stageMock as EDPCDPipelineStageKubeObjectInterface,
                CDPipelineStages: stagesMock as EDPCDPipelineStageKubeObjectInterface[],
            })
        );

        expect(imageStream).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'CodebaseImageStream',
            metadata: {
                creationTimestamp: '2022-10-25T19:59:26Z',
                generation: 2,
                name: 'vp-test-jenkins-pipe-sit-vp-test-jenkins-verified',
                namespace: 'edp-delivery-vp-dev',
                resourceVersion: '326086111',
                uid: '9164d51e-aff4-4592-8175-7d9b1e05fb83',
            },
            spec: {
                codebase: 'vp-test-jenkins',
                imageName: '093899590031.dkr.ecr.eu-central-1.amazonaws.com/edp-delivery-vp-dev',
                tags: [{ created: '2022-10-25T20:03:36', name: 'master-1.0.0-1' }],
            },
        });
    });
});
