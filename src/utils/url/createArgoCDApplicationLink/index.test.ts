import { createArgoCDApplicationLink } from './index';

describe('test createArgoCDApplicationLink util', () => {
    it('should successfully create argocd application url based on given argoCDURLOrigin, pipeline name, stage name and app name params', () => {
        expect(
            createArgoCDApplicationLink(
                'https://argocd-test.com/',
                'test-pipeline-name',
                'test-stage-name',
                'test-app-name'
            )
        ).toEqual(
            'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name%2Capp.edp.epam.com%2Fstage%3Dtest-stage-name%2Capp.edp.epam.com%2Fapp-name%3Dtest-app-name'
        );
    });
});
