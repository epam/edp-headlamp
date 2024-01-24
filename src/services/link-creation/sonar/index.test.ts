import { SonarQubeURLService } from './index';

describe('testing link-creation SonarQubeURLService', () => {
  it('should successfully create sonar url based on given sonarURLOrigin and namespace params', () => {
    expect(
      SonarQubeURLService.createDashboardLink(
        'https://sonar-test.com',
        'test-codebaseBranch-name',
        'test-codebase-name'
      )
    ).toEqual(
      'https://sonar-test.com/dashboard?branch=test-codebaseBranch-name&id=test-codebase-name'
    );
  });

  it('should successfully create metric url based on given sonarURLOrigin and metricName params', () => {
    expect(
      SonarQubeURLService.createLinkByMetricName('https://sonar-test.com', 'bugs', 'test-project')
    ).toEqual('https://sonar-test.com/component_measures?id=test-project&metric=bugs');
  });

  it('should successfully create issue url based on given sonarURLOrigin and issueType params', () => {
    expect(
      SonarQubeURLService.createLinkByIssueType(
        'https://sonar-test.com',
        'coverage',
        'test-project'
      )
    ).toEqual(
      'https://sonar-test.com/project/issues?id=test-project&resolved=false&types=coverage'
    );
  });

  it('should successfully create metrics api url based on given sonarURLOrigin and codebaseName params', () => {
    expect(
      SonarQubeURLService.createMetricsApiUrl('https://sonar-test.com', 'test-codebase-name')
    ).toEqual(
      'https://sonar-test.com/api/measures/component?component=test-codebase-name&metricKeys=bugs,code_smells,coverage,duplicated_lines_density,ncloc,sqale_rating,alert_status,reliability_rating,security_hotspots,security_rating,sqale_index,vulnerabilities'
    );
  });
});
