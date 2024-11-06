import { createCleanPipelineRunInstance } from './index';

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
          name: 'test-pipe',
          namespace: 'test-namespace',
        },
        spec: {
          applications: ['test-app-1', 'test-app-2'],
          applicationsToPromote: ['test-app-1', 'test-app-2'],
          deploymentType: 'container',
          inputDockerStreams: ['test-app-1-main', 'test-app-2-main'],
          name: 'test-pipe',
        },
      },
      stage: {
        apiVersion: 'v2.edp.epam.com/v1',
        kind: 'Stage',
        // @ts-ignore
        metadata: {
          name: 'test-pipe-sit',
          namespace: 'test-namespace',
        },
        spec: {
          cdPipeline: 'test-pipe',
          cleanTemplate: 'clean',
          clusterName: 'in-cluster',
          description: 'sit',
          name: 'sit',
          namespace: 'test-namespace-test-pipe-sit',
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
        generateName: 'clean-test-pipe-sit-',
        labels: {
          'app.edp.epam.com/cdpipeline': 'test-pipe',
          'app.edp.epam.com/cdstage': 'test-pipe-sit',
          'app.edp.epam.com/pipelinetype': 'clean',
        },
      },
      spec: {
        params: [
          { name: 'CDSTAGE', value: 'sit' },
          { name: 'CDPIPELINE', value: 'test-pipe' },
        ],
        pipelineRef: { name: 'clean' },
        taskRunTemplate: { serviceAccountName: 'tekton' },
        timeouts: { pipeline: '1h00m0s' },
      },
    });
  });
});
