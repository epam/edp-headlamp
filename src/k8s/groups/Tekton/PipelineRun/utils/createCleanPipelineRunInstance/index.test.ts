import { v4 as uuidv4 } from 'uuid';
import { createCleanPipelineRunInstance } from './index';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const MOCKED_UUID = '1234';
(uuidv4 as jest.Mock).mockReturnValue(MOCKED_UUID);

describe('testing createCleanPipelineRunInstance', () => {
  it('should return valid kube object', () => {
    const object = createCleanPipelineRunInstance({
      pipelineRunTemplate: {
        apiVersion: 'tekton.dev/v1',
        kind: 'PipelineRun',
        // @ts-ignore
        metadata: {
          annotations: {
            'argocd.argoproj.io/compare-options': 'IgnoreExtraneous',
          },
          generateName: 'clean-$(tt.params.CDPIPELINE)-$(tt.params.CDSTAGE)-',
          labels: {
            'app.edp.epam.com/cdpipeline': '$(tt.params.CDPIPELINE)',
            'app.edp.epam.com/cdstage': '$(tt.params.CDPIPELINE)-$(tt.params.CDSTAGE)',
            'app.edp.epam.com/pipelinetype': 'clean',
          },
        },
        spec: {
          params: [
            {
              name: 'CDSTAGE',
              value: '$(tt.params.CDSTAGE)',
            },
            {
              name: 'CDPIPELINE',
              value: '$(tt.params.CDPIPELINE)',
            },
          ],
          pipelineRef: {
            name: 'clean',
          },
          taskRunTemplate: {
            serviceAccountName: 'tekton',
          },
          timeouts: {
            pipeline: '1h00m0s',
          },
        },
      },
      CDPipeline: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'CDPipeline',
        // @ts-ignore
        metadata: {
          name: 'test-pipe-very-long-long-long-long-long-long-name',
          namespace: 'test-namespace',
        },
        spec: {
          applications: ['test-app-1', 'test-app-2'],
          applicationsToPromote: ['test-app-1', 'test-app-2'],
          deploymentType: 'container',
          inputDockerStreams: ['test-app-1-main', 'test-app-2-main'],
          name: 'test-pipe-very-long-long-long-long-long-long-name',
        },
      },
      stage: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Stage',
        // @ts-ignore
        metadata: {
          name: 'test-pipe-very-long-long-long-long-long-long-name-sit',
          namespace: 'test-namespace',
        },
        spec: {
          cdPipeline: 'test-pipe-very-long-long-long-long-long-long-name',
          cleanTemplate: 'clean',
          clusterName: 'in-cluster',
          description: 'sit',
          name: 'sit',
          namespace: 'test-namespace-test-pipe-very-long-long-long-long-long-long-name-sit',
          order: 0,
          qualityGates: [
            {
              autotestName: null,
              branchName: null,
              qualityGateType: 'manual',
              stepName: 'sit',
            },
          ],
          source: {
            // @ts-ignore
            library: {
              name: 'default',
            },
            type: 'default',
          },
          triggerTemplate: 'deploy',
          triggerType: 'Manual',
        },
      },
    });

    expect(object).toEqual({
      apiVersion: 'tekton.dev/v1',
      kind: 'PipelineRun',
      metadata: {
        annotations: { 'argocd.argoproj.io/compare-options': 'IgnoreExtraneous' },
        name: `clean-test-pipe-very-long-long-long-long-long-long-name-si-${MOCKED_UUID}`,
        labels: {
          'app.edp.epam.com/cdpipeline': 'test-pipe-very-long-long-long-long-long-long-name',
          'app.edp.epam.com/cdstage': 'test-pipe-very-long-long-long-long-long-long-name-sit',
          'app.edp.epam.com/pipelinetype': 'clean',
        },
      },
      spec: {
        params: [
          { name: 'CDSTAGE', value: 'sit' },
          { name: 'CDPIPELINE', value: 'test-pipe-very-long-long-long-long-long-long-name' },
        ],
        pipelineRef: { name: 'clean' },
        taskRunTemplate: { serviceAccountName: 'tekton' },
        timeouts: { pipeline: '1h00m0s' },
      },
    });
  });
});
