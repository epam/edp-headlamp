import { createArgoCDPipelineLink } from './index';

describe('test createArgoCDPipelineLink util', () => {
    it('should successfully create argocd pipeline url based on given argoCDURLOrigin and pipeline name param', () => {
        expect(createArgoCDPipelineLink('https://argocd-test.com/', 'test-pipeline-name')).toEqual(
            'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name'
        );
    });
});
