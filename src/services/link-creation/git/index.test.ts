import { GIT_SERVERS } from '../../../constants/gitServers';
import { GitURLService } from './index';

describe('testing link-creation GitURLService', () => {
  it('should successfully create git ops value file url  based on given gitOpsWebUrl, pipeline name,  stage name, app name and git server params', () => {
    expect(
      GitURLService.createGitOpsValuesYamlFileLink(
        'https://git.test.com/test-project/test-env/edp-gitops',
        'test-pipeline-name',
        'test-stage-name',
        'test-app-name',
        GIT_SERVERS.GITHUB
      )
    ).toEqual(
      'https://git.test.com/test-project/test-env/edp-gitops/blob/main/test-pipeline-name/test-stage-name/test-app-name-values.yaml'
    );
    expect(
      GitURLService.createGitOpsValuesYamlFileLink(
        'https://git.test.com/test-project/test-env/edp-gitops',
        'test-pipeline-name',
        'test-stage-name',
        'test-app-name',
        GIT_SERVERS.GITLAB
      )
    ).toEqual(
      'https://git.test.com/test-project/test-env/edp-gitops/blob/main/test-pipeline-name/test-stage-name/test-app-name-values.yaml'
    );
    expect(
      GitURLService.createGitOpsValuesYamlFileLink(
        'https://test-gerrit.com/gitweb?p=edp-gitops.git',
        'test-pipeline-name',
        'test-stage-name',
        'test-app-name',
        GIT_SERVERS.GERRIT
      )
    ).toEqual(
      'https://test-gerrit.com/gitweb?p=edp-gitops.git&f=test-pipeline-name%2Ftest-stage-name%2Ftest-app-name-values.yaml&hb=refs%2Fheads%2Fmain&a=blob'
    );
    expect(
      GitURLService.createGitOpsValuesYamlFileLink(
        'https://git.test.com/test-project/test-env/edp-gitops',
        'test-pipeline-name',
        'test-stage-name',
        'test-app-name',
        GIT_SERVERS.BITBUCKET
      )
    ).toEqual(
      'https://git.test.com/test-project/test-env/edp-gitops/src/main/test-pipeline-name/test-stage-name/test-app-name-values.yaml'
    );
  });
});
