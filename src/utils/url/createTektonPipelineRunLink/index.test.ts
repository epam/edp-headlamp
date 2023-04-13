import { createTektonPipelineRunLink } from './index';

describe('test createTektonPipelineRunLink util', () => {
    it('should successfully create tekton pipeline run url based on given tektonURLOrigin, namespace and pipeline run name params', () => {
        expect(
            createTektonPipelineRunLink(
                'https://tekton-test-origin.com',
                'test-namespace',
                'test-pipeline-run-name'
            )
        ).toEqual(
            'https://tekton-test-origin.com/#/namespaces/test-namespace/pipelineruns/test-pipeline-run-name'
        );
    });
});
