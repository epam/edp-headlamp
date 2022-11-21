import { CDPIPELINE_STAGE_NAMES } from '../../../../components/CreateCDPipelineStage/components/CreateCDPipelineStageForm/names';
import { createCDPipelineStageInstance } from './index';

describe('testing createCDPipelineStageInstance', () => {
    it('should return valid kube object', () => {
        const object = createCDPipelineStageInstance(
            CDPIPELINE_STAGE_NAMES,
            {
                namespace: 'edp-delivery-vp-dev',
                order: 1,
                triggerType: 'Manual',
                jobProvisioning: 'default',
                sourceLibraryName: 'default',
                sourceType: 'default',
                name: 'test-stage-name',
                cdPipeline: 'vp-test-pipe-creation',
                description: 'test-description',
                qualityGates: [
                    {
                        qualityGateType: 'manual',
                        stepName: 'test-step-name',
                        autotestName: null,
                        branchName: null,
                    },
                ],
            },
            {
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'CDPipeline',
                metadata: {
                    name: 'vp-test-pipe-creation',
                    namespace: 'edp-delivery-vp-dev',
                },
                spec: {
                    applications: ['vp-test-creation'],
                    deploymentType: 'container',
                    inputDockerStreams: ['vp-test-creation-master'],
                    name: 'vp-test-pipe-creation',
                },
            }
        );

        expect(object).toEqual({
            apiVersion: 'v2.edp.epam.com/v1',
            kind: 'Stage',
            metadata: {
                name: 'vp-test-pipe-creation-test-stage-name',
                namespace: 'edp-delivery-vp-dev',
            },
            spec: {
                name: 'test-stage-name',
                cdPipeline: 'vp-test-pipe-creation',
                order: 1,
                triggerType: 'Manual',
                jobProvisioning: 'default',
                source: { library: { name: 'default' }, type: 'default' },
                description: 'test-description',
                qualityGates: [
                    {
                        qualityGateType: 'manual',
                        stepName: 'test-step-name',
                        autotestName: null,
                        branchName: null,
                    },
                ],
            },
        });
    });
});
