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
});
