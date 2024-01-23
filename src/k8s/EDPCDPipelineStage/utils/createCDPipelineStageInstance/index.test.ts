import { STAGE_FORM_NAMES } from '../../../../widgets/CreateEditStage/names';
import { createCDPipelineStageInstance } from './index';

describe('testing createCDPipelineStageInstance', () => {
  it('should return valid kube object', () => {
    const object = createCDPipelineStageInstance(
      STAGE_FORM_NAMES,
      {
        order: 1,
        triggerType: 'Manual',
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
        // @ts-ignore
        metadata: {
          name: 'vp-test-pipe-creation',
        },
        // @ts-ignore
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
      },
      spec: {
        name: 'test-stage-name',
        cdPipeline: 'vp-test-pipe-creation',
        order: 1,
        triggerType: 'Manual',
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
