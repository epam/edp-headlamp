import { TektonURLService } from './index';

describe('testing link-creation TektonURLService', () => {
  it('should successfully create tekton pipeline url based on given tektonURLOrigin, namespace and pipelineName params', () => {
    expect(
      TektonURLService.createPipelineLink(
        'https://tekton-test.com',
        'test-namespace',
        'test-pipeline-name'
      )
    ).toEqual('https://tekton-test.com/#/namespaces/test-namespace/pipelines/test-pipeline-name');
  });

  it('should successfully create tekton pipeline run url based on given tektonURLOrigin, namespace and pipelineRunName params', () => {
    expect(
      TektonURLService.createPipelineRunLink(
        'https://tekton-test.com',
        'test-namespace',
        'test-pipeline-run-name'
      )
    ).toEqual(
      'https://tekton-test.com/#/namespaces/test-namespace/pipelineruns/test-pipeline-run-name'
    );
  });

  it('should successfully create tekton task run url based on given tektonURLOrigin, namespace and taskRun params', () => {
    expect(
      TektonURLService.createTaskRunLink(
        'https://tekton-test.com',
        'test-namespace',
        'test-task-run-name'
      )
    ).toEqual('https://tekton-test.com/#/namespaces/test-namespace/taskruns/test-task-run-name');
  });
});
