import { createArgoCDStageLink } from './index';

describe('test createArgoCDStageLink util', () => {
    it('should successfully create argocd stage url based on given argoCDURLOrigin, pipeline name and stage name params', () => {
        expect(
            createArgoCDStageLink(
                {
                    argocd: 'https://argocd-test.com/',
                },
                'test-pipeline-name',
                'test-stage-name'
            )
        ).toEqual(
            'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name%2Capp.edp.epam.com%2Fstage%3Dtest-stage-name'
        );
    });
});
