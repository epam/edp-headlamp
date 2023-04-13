import { createTektonPipelineLink } from './index';

describe('test createTektonPipelineLink util', () => {
    it('should successfully create tekton pipeline url based on given tektonURLOrigin, namespace and pipeline name params', () => {
        expect(
            createTektonPipelineLink(
                'https://tekton-test-origin.com',
                'test-namespace',
                'test-pipeline-name'
            )
        ).toEqual(
            'https://tekton-test-origin.com/#/namespaces/test-namespace/pipelines/test-pipeline-name'
        );
    });
});
