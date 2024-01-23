import { ArgoCDURLService } from './index';

describe('testing link-creation ArgoCDURLService', () => {
  it('should successfully create argocd application url based on given argoCDURLOrigin, pipeline name, stage name and app name params', () => {
    expect(
      ArgoCDURLService.createApplicationLink(
        'https://argocd-test.com/',
        'test-pipeline-name',
        'test-stage-name',
        'test-app-name'
      )
    ).toEqual(
      'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name%2Capp.edp.epam.com%2Fstage%3Dtest-stage-name%2Capp.edp.epam.com%2Fapp-name%3Dtest-app-name'
    );
  });

  it('should successfully create argocd pipeline url based on given argoCDURLOrigin and pipeline name param', () => {
    expect(
      ArgoCDURLService.createPipelineLink('https://argocd-test.com/', 'test-pipeline-name')
    ).toEqual(
      'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name'
    );
  });

  it('should successfully create argocd stage url based on given argoCDURLOrigin, pipeline name and stage name params', () => {
    expect(
      ArgoCDURLService.createStageLink(
        'https://argocd-test.com/',
        'test-pipeline-name',
        'test-stage-name'
      )
    ).toEqual(
      'https://argocd-test.com/applications?labels=app.edp.epam.com%2Fpipeline%3Dtest-pipeline-name%2Capp.edp.epam.com%2Fstage%3Dtest-stage-name'
    );
  });
});
